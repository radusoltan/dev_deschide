<?php

namespace App\Http\Services;

use App\Models\Image;
use App\Models\ImageThumbnail;
use App\Models\Rendition;
use Illuminate\Http\UploadedFile;
use Image as ImageManager;

class ImageService
{
    public function uploadImage(UploadedFile $file)
    {
        $name = $file->getClientOriginalName();
        $imageFile = ImageManager::make($file->getRealPath());
        $destinationPath = storage_path('app/public/images/'.$name);
        $imageFile->save($destinationPath, 100, 'jpg');

        $image = Image::where('name', $name)->first();
        if(!$image){
            $image = Image::create([
                'name' => $name,
                'path' => 'storage/images/'.$name,
                'width' => $imageFile->width(),
                'height' => $imageFile->height()
            ]);
        }
        $this->saveImageThumbnails($image);
        return $image;
    }

    protected function saveImageThumbnails(Image $image){

        $file = file_get_contents(storage_path('app/public/images/'.$image->name));
        $name = $image->name;

        $renditions = Rendition::all();
        foreach ($renditions as $rendition){
            $img = ImageManager::make($file);
            $destinationPath = storage_path('app/public/images/thumbnails');
            $thumb = ImageThumbnail::where('rendition_id', $rendition->id)->where('image_id', $image->id)->first();
            $img->crop($rendition->width, $rendition->height)
                ->save($destinationPath.'/'.$rendition->name.'_'.$name, 100, 'jpg');
            if (!$thumb){
                ImageThumbnail::create([
                    'rendition_id' => $rendition->id,
                    'image_id' => $image->id,
                    'path' => 'storage/images/thumbnails/'.$rendition->name.'_'.$name,
                    'width' => $rendition->width,
                    'height' => $rendition->height
                ]);
            }
        }

    }

}
