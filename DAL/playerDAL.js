import { connectToSupabase } from "../lib/supabase.js";

export async function getAllPlayers() {
    try {
        const supabase = connectToSupabase();
        const { data, error } = await supabase.from('players').select();
        if (error) throw new Error(error.message);
        return data;
    } catch (err) {
        console.log("Error with get all players: ", err.message)
    }
}

export async function getPlayerByNameDal(name) {
    const supabase = connectToSupabase();
    const { data, error } = await supabase.from('players').select().eq('name', name);
    if (error) throw new Error(error.message);
    return data;
}

export async function createPlayerDal(newPlayer) {
    const supabase = connectToSupabase();
    const { data, error } = await supabase.from('players').insert({ name: newPlayer.name, highscore: newPlayer.highScore }).select();
    if (error) throw new Error(error.message)
    return data
}