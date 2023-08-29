<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Category::paginate(10);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();
        dump(app()->getLocale());

        return Category::create([
            'title' => $data['title'],
            'slug' => Str::slug($data['title']),
            'in_menu' => $data['in_menu']
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category): Category
    {
        return $category;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category): Category
    {
        $data = $request->validated();
        app()->setLocale($data['locale']);

        $category->update([
            'title' => $data['title'],
            'in_menu' => $data['in_menu'],
            'slug' => Str::slug($data['title'])
        ]);

        return $category;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): Category
    {
        $category->delete();

        return $category;
    }

/**
     * Publish the specified resource from storage.
     */
    public function getCategoryArticles(Category $category)//: Category
    {
        return $category->articles()->orderBy('created_at', 'desc')->paginate(10);
    }

    public function addArticleToCategory(StoreArticleRequest $request,Category $category)
    {
        $data = $request->validated();

        app()->setLocale($data['locale']);
        return Article::create([
            'title' => $data['title'],
            'slug' => Str::slug($data['title']),
            'category_id' => $category->id,
        ]);
    }

}
