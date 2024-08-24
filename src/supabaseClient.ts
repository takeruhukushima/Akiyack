import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.React_APP_SUPABASE_URL!;
const supabaseKey = process.env.React_APP_SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
