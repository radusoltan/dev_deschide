<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Image extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;

    protected $fillable = ['name', 'path', 'width','height'];
    public array $translatedAttributes = ['title', 'author', 'description'];


    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }

    public function articles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class);
    }

    public function thumbnails(): HasMany
    {
        return $this->hasMany(ImageThumbnail::class,'image_id','id');
    }


}
