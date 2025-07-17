import { getAll, insertData, getRiddlesByLevelDal, updateByIdDal, deleteByIdDal } from '../DAL/riddleDAL.js';

export async function getAllRiddles() {
    const allRiddles = await getAll();
    return allRiddles;
}

export async function createRiddle(newData) {
    if (!newData.name || !newData.taskDescription || !newData.correctAnswer || !newData.difficulty) {
        return "new object has missing keys";
    }
    const insertedId = await insertData(newData);
    if (insertedId) {
        return (`new data: '${newData.name}', id: '${insertedId}' insert succesfully.`);
    }
    return "Failed to create data"
}

export async function getRiddlesByLevel(level) {
    const data = await getRiddlesByLevelDal(level);
    if (!data) {
        return 'Failed to get data';
    }
    return data;
}

export async function updateById(id, newData) {
    const data = await updateByIdDal(id, newData);
    if (!data) {
        return `Failed to update object with id '${id}'`;
    }
    return `Object with id '${id}' updated successfully.`;
}

export async function deleteById(id) {
    const data = await deleteByIdDal(id);
    if (!data) {
        return `Failed to delete object with id '${id}'`;
    }
    return `Object with id '${id}' deleted successfully.`
}
