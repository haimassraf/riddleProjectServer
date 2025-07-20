import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export function connectToSupabase() {
    try {
        const supabase = createClient(
            process.env.SUPABASE_PROJECT_URL,
            process.env.SUPABASE_API_KEY
        );
        console.log("connect successfully");
        return supabase;
    } catch (err) {
        console.log("Error with connect to supabase: ", err.message);
    }
}