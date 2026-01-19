-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS table (extends auth.users)
create table if not exists public.users (
  id uuid references auth.users not null primary key,
  email text,
  is_super_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on users
alter table public.users enable row level security;

-- Helper function to check super admin status (Bypasses RLS to avoid recursion)
create or replace function public.is_super_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.users
    where id = auth.uid()
    and is_super_admin = true
  );
$$;

-- Policy to allow users to read their own data
create policy "Users can read own data" on public.users for select using (
  auth.uid() = id
);

-- Policy to allow super admins to read all data
-- Uses function to avoid recursion
create policy "Super admins can read all users" on public.users for select using (
  public.is_super_admin()
);

-- Policy to allow super admins to update users
create policy "Super admins can update users" on public.users for update using (
  public.is_super_admin()
);

-- TRIGGER to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, is_super_admin)
  values (new.id, new.email, false);
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists to avoid error on replay
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- PROJECTS table
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image_url text,
  technologies text[],
  demo_url text,
  repo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.projects enable row level security;
create policy "Public can view projects" on public.projects for select using (true);
create policy "Admins can insert projects" on public.projects for insert with check (public.is_super_admin());
create policy "Admins can update projects" on public.projects for update using (public.is_super_admin());
create policy "Admins can delete projects" on public.projects for delete using (public.is_super_admin());

-- SKILLS table
create table if not exists public.skills (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text, -- 'frontend', 'backend', etc.
  level integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.skills enable row level security;
create policy "Public can view skills" on public.skills for select using (true);
create policy "Admins can manage skills" on public.skills for all using (public.is_super_admin());

-- EXPERIENCE table
create table if not exists public.experience (
  id uuid default uuid_generate_v4() primary key,
  role text not null,
  company text not null,
  start_date text, -- Storing as text based on interface
  end_date text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.experience enable row level security;
create policy "Public can view experience" on public.experience for select using (true);
create policy "Admins can manage experience" on public.experience for all using (public.is_super_admin());

-- ABOUT table
create table if not exists public.about (
  id uuid default uuid_generate_v4() primary key,
  profile_image_url text,
  bio_paragraph_1 text,
  bio_paragraph_2 text,
  years_of_experience text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.about enable row level security;
create policy "Public can view about" on public.about for select using (true);
create policy "Admins can manage about" on public.about for all using (public.is_super_admin());

-- HERO table
create table if not exists public.hero (
  id uuid default uuid_generate_v4() primary key,
  greeting text,
  name text,
  role_text text,
  headline_prefix text,
  headline_highlight text,
  headline_suffix text,
  description text,
  resume_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.hero enable row level security;
create policy "Public can view hero" on public.hero for select using (true);
create policy "Admins can manage hero" on public.hero for all using (public.is_super_admin());

-- CONTACT_SETTINGS table
create table if not exists public.contact_settings (
  id uuid default uuid_generate_v4() primary key,
  email text,
  phone text,
  address text,
  github_url text,
  linkedin_url text,
  twitter_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.contact_settings enable row level security;
create policy "Public can view contact_settings" on public.contact_settings for select using (true);
create policy "Admins can manage contact_settings" on public.contact_settings for all using (public.is_super_admin());

-- MESSAGES table
create table if not exists public.messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.messages enable row level security;
-- Public can INSERT messages (contact form)
create policy "Public can insert messages" on public.messages for insert with check (true);
-- Only Admins can VIEW messages
create policy "Admins can view messages" on public.messages for select using (public.is_super_admin());


-- ==========================================
-- ADMIN SETUP & INITIAL DATA
-- ==========================================

-- 1. Sync existing Auth users to Public users
-- (Useful if you already signed up but wiped the public tables)
insert into public.users (id, email, is_super_admin)
select id, email, false
from auth.users
on conflict (id) do nothing;

-- 2. Promote specific user to Admin
update public.users
set is_super_admin = true
where email = 'durjoybarua8115@gmail.com';

-- 3. Insert Default Data (only if missing)
insert into public.about (bio_paragraph_1, bio_paragraph_2, years_of_experience)
select 'Welcome to my portfolio.', 'I build high-quality web applications.', '3+'
where not exists (select 1 from public.about);

insert into public.hero (greeting, name, role_text, headline_prefix, headline_highlight, headline_suffix, description)
select 'Hello, I am', 'Durjoy Barua', 'Software Developer', 'Turning ideas into', 'reality', '.', 'I specialize in building exceptional digital experiences.'
where not exists (select 1 from public.hero);

insert into public.contact_settings (email)
select 'durjoybarua8115@gmail.com'
where not exists (select 1 from public.contact_settings);

-- ==========================================
-- STORAGE SETUP (Run this in SQL Editor)
-- ==========================================

-- 1. Create Bucket
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

-- 2. Storage Policies
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'portfolio-assets' );

create policy "Auth users can upload"
  on storage.objects for insert
  with check ( bucket_id = 'portfolio-assets' and auth.role() = 'authenticated' );

create policy "Auth users can update"
  on storage.objects for update
  using ( bucket_id = 'portfolio-assets' and auth.role() = 'authenticated' );

create policy "Auth users can delete"
  on storage.objects for delete
  using ( bucket_id = 'portfolio-assets' and auth.role() = 'authenticated' );
