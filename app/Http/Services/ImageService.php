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

    public function crop(Image $image,Rendition $rendition, array $crop){
        $name = $image->name;
        $destinationPath = storage_path('app/public/images/thumbnails');
        $img = ImageManager::make(storage_path('app/public/images/'.$name));

        $width = round($image->width / 100 * $crop['p']['width']);
        $height = round($image->height / 100 * $crop['p']['height']);
        $x = round($image->width / 100 * $crop['p']['x']);
        $y = round($image->height / 100 * $crop['p']['y']);

        $cropped = $img->crop($width, $height, $x, $y)->fit($rendition->width, $rendition->height)
            ->save($destinationPath.'/'.$rendition->name.'_'.$name, 100, 'jpg');
        $thumb = ImageThumbnail::where([
            ['rendition_id', $rendition->id],
            ['image_id', $image->id]
        ])->first();

        $thumb->update([
            'path' => 'storage/images/thumbnails/'.$rendition->name.'_'.$name,
            'width' => $rendition->width,
            'height' => $rendition->height,
            'coords' => json_encode($crop['p'])
        ]);

        if (!$thumb){
            $thumb =ImageThumbnail::create([
                'image_id' => $image->id,
                'rendition_id' => $rendition->id,
                'width' => $cropped->width(),
                'height' => $cropped->height(),
                'path' => 'storage/images/thumbnails/'.$rendition->name.'_'.$name,
                'coords' => json_encode($crop['p'])
            ]);
        }

    }

}
