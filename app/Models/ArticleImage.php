<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleImage extends Model
{
    use HasFactory;

    protected $fillable = ['article_id','image_id','is_main'];

    public $timestamps = false;
    protected $casts = [
        'is_main' => 'boolean'
    ];

    public function articles()
    {
        return $this->belongsToMany(Article::class,'article_images','');
    }

    public function images(){
        return $this->belongsToMany(Image::class, 'article_images');
    }
}
