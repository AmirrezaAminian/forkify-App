import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultView from './views/resultView.js'  
import paginationView from './views/paginationView.js'

// import icons from '../img/icons.svg' //parcel 1
import 'core-js/stable'
import 'regenerator-runtime/runtime'
 


// if(module.hot){
//   module.hot.accept() ;
// }



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async function () {
  try {
    

    const id = window.location.hash.slice(1)
    // console.log(id);

    if(!id) return;
    recipeView.renderSpinner() ;

    // 1) loading recipe
    await model.loadRecipe(id)
    
    //2) rendering recipe
    recipeView.render(model.state.recipe)


  } catch (err) {
    // console.error(err);
    recipeView.renderError();
  }
};

controlRecipes();

const controlSearchResults = async function(){
  try{
    resultView.renderSpinner() ;


    //1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query)

    //3) render result

      // resultView.render(model.state.search.results);
      resultView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons 
    paginationView.render(model.state.search)
  }catch(err){
    console.log(err);
  }
}

controlSearchResults();


const contrtolPagination = function(goToPage){
  //1) render New result
  resultView.render(model.getSearchResultsPage(goToPage));

  //2) Render New pagination buttons
  paginationView.render(model.state.search);
}

const init = function(){
  recipeView.addHandleRender(controlRecipes) ;
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(contrtolPagination)
}
init()


 

