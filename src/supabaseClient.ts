import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hkvwccxjbycjbpgbwzxx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrdndjY3hqYnljamJwZ2J3enh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0MjI4NjMsImV4cCI6MjAzOTk5ODg2M30.GAz4lPYcQSOvpjT4hFkO1y6E5WobxvznXzUIJ9PljLI';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
