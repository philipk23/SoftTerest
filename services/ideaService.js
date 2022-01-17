import { request } from "./request.js";

const databaseUrl = "https://softterest-c8015-default-rtdb.firebaseio.com";

const api = {
    ideas: `${databaseUrl}/ideas.json`,
}

export const getAllIdeas = async (searchText) => {
    let res = await request(api.ideas, 'GET');

    //console.log(Object.keys(res).map(key => ({key, ...res[key]})));

    //It works without the filter part

    return Object.keys(res).map(key => ({key, ...res[key]}))//.filter(x => !searchText || searchText == key.title);
}

export const getOneById = async (id) => {
    let res = await request(`${databaseUrl}/ideas/${id}.json`, 'GET');

    return res;
}

export const createIdea = async (ideaData) => {
    let res = await request(api.ideas, 'POST', ideaData);

    return res;
}

export const deleteIdea = async (id) => {
    let res = await request(`${databaseUrl}/ideas/${id}.json`, 'DELETE');

    return res;
}

export const likeIdea = async(id, email) => {
    let res = await request(`${databaseUrl}/ideas/${id}/likes/.json`, 'POST', {email});

    return res;
}