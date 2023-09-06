<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Services\ImageService;
use App\Models\Article;
use App\Models\ArticleImage;
use App\Models\Image;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreArticleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return $article;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article): Article
    {
        $data = $request->validated();

        app()->setLocale($data['locale']);

        $article->update([
            'title' => $data['title'],
            'slug' => Str::slug($data['title']),
            'lead' => $data['lead'],
            'body' => $data['body'],
            'is_breaking' => $data['is_breaking'],
            'is_alert' => $data['is_alert'],
            'is_flash' => $data['is_flash'],
            'status' => $data['status'],
        ]);

        return $article;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }

    public function getArticleImages(Article $article)
    {
        return $article->images()->with('thumbnails')->get();
    }

    public function addArticleImages(Article $article)
    {
        $service = new ImageService();

        foreach(request()->images as $file) {
            $image = $service->uploadImage($file);

            if (!$article->images->contains($image->id)) {
                $article->images()->attach($image->id);
            }
        }
        return $article->images()->with('thumbnails')->get();
    }

    public function deleteArticleImage(Article $article, Image $image)
    {
        $article->images()->detach($image->id);
        return $article->images()->with('thumbnails')->get();
    }

    public function setArticleMainImage(Article $article, Image $image){

        $articleImages = ArticleImage::where('article_id',$article->id)
            ->where('is_main',true)
            ->get();
        if ($articleImages->count() > 0){
            foreach ($articleImages as $img){
                $img->update([
                    'is_main' => false
                ]);
            }
        }

        $mainImage = ArticleImage::where('article_id',$article->id)
            ->where('image_id',$image->id)
            ->first();

        $mainImage->update([
            'is_main' => true
        ]);

        return $article->images()->with('thumbnails')->get();
    }

}
