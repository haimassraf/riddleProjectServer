import { connectToSupabase } from "../lib/supabase.js";

export async function getPlayerByNameDal(name) {
    try {
        const supabase = connectToSupabase();
        const { data, error } = await supabase.from('players').select().eq('name', name);
        if (error) throw new Error(error.message);
        if (data.length === 0) {
            console.log(`Player ${name} Not Found`);
            return;
        }
        return data[0];
    } catch (err) {
        console.log("Error with get player by name: ", err.message)
    }
}

export async function getPlayerByIdDal(id) {
    try {
        const supabase = connectToSupabase();
        const { data, error } = await supabase.from('players').select().eq('id', id);
        if (error) throw new Error(error.message);
        return data[0];
    } catch (err) { console.log("Error with get player by id: ", err.message) }
}


export async function getAllPlayersDal() {
    try {
        const supabase = connectToSupabase();
        const { data, error } = await supabase.from('players').select();
        if (error) throw new Error(error.message);
        return data;
    } catch (err) {
        console.log("Error with get all players: ", err.message)
    }
}

export async function createPlayerDal(newPlayer) {
    try {
        const supabase = connectToSupabase();
        const { data, error } = await supabase.from('players').insert({
            name: newPlayer.name, high_score: newPlayer.highScore, password: newPlayer.password
        }).select();
        if (error) throw new Error(error.message)
        return data[0];
    } catch (err) {
        return ("Error with create player: ", err.message)
    }
}

export async function updatePlayerDal(id, body) {
    try {
        const supabase = connectToSupabase();
        const { data, error } = await supabase.from('players').update(body).eq('id', id).select();
        if (error) throw new Error(error.message);
        return data[0];
    } catch (err) {
        return ("Error to update player: ", err.message)
    }
}

export async function deletePlayerDal(id) {
    try {
        const supabase = connectToSupabase();
        const { data, error } = await supabase.from('players').delete().eq('id', id).select();
        if (error) throw new Error(error.message);
        return data[0];
    } catch (err) {
        console.log("Error with delete players: ", err.message);
    }
}