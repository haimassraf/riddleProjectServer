import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export function connectToSupabase() {
    const supabase = createClient(
        process.env.SUPABASE_PROJECT_URL,
        process.env.SUPABASE_API_KEY
    );

    console.log("connect successfully");
    return supabase;
}