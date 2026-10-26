import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qtslsxfxefrnfdeleegy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0c2xzeGZ4ZWZybmZkZWxlZWd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NjE3NTcsImV4cCI6MjEwODMzNzc1N30.hrDjimAT8nQ_n_TivKS7SJ6Glq0sa_S1GhisrIsvaSA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
