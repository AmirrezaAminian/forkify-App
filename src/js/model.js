// model includes data

import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
import { RES_PER_PAGE } from './config.js';


export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page : 1 ,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
   const data = await getJSON(`${API_URL}${id}`);

    // console.log(data);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      serving: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(state.recipe);
  } catch (err) {
    // Temp error handling
    console.error(`${err}💥💥💥`);
    throw err ;
  }
};

export const loadSearchResults = async function(query){
   try{
    state.search.query = query ;
      const data = await getJSON(
        `${API_URL}?search=${query}`
      );
      console.log(data);

      state.search.results = data.data.recipes.map(rec =>{
        return {
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
        };
      })
   }catch(err){
    console.error(`${err}💥💥💥`);
    throw err;
   }
}



export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0 ;
  const end = page * state.search.resultsPerPage; // 9
  return state.search.results.slice(start, end);
};