<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ImageController;
use App\Models\Rendition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user',[AuthController::class,'user']);


    Route::apiResource('/categories', CategoryController::class);
    Route::get('/categories/{category}/articles', [CategoryController::class, 'getCategoryArticles']);
    Route::post('/category/{category}/add-article',[CategoryController::class, 'addArticleToCategory']);
    Route::apiResource('/articles', ArticleController::class);
    Route::get('/articles/{article}/images', [ArticleController::class, 'getArticleImages']);
    Route::post('/articles/{article}/images', [ArticleController::class, 'addArticleImages']);
    Route::delete('/articles/{article}/images/{image}', [ArticleController::class, 'deleteArticleImage']);
    Route::put('/articles/{article}/images/{image}/main',[ArticleController::class, 'setArticleMainImage']);

    Route::get('/images/{image}/thumbnails', [ImageController::class, 'getThumbnails']);
    Route::post('/images/{image}/crop', [ImageController::class, 'cropImage']);

    Route::get('/renditions', function(){
        return Rendition::all();
    });



});

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
