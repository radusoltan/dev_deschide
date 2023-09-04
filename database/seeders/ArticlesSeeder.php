<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ArticlesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i=0;$i<100;$i++){
            app()->setLocale('ro');
            $title = '// RO //'.fake()->sentence();

            $article = Article::create([
                'category_id' => fake()->randomKey(Category::pluck('id','id')->all()),
                'title' => $title,
                'slug' => Str::slug($title),
                'lead' => fake()->paragraph(),
                'body' => fake()->paragraph(),
                'status' => "P"
            ]);

            app()->setLocale('en');
            $title = '// EN //'.fake()->sentence();
            $article->update([
                'title' => $title,
                'slug' => Str::slug($title),
                'lead' => fake()->paragraph(),
                'body' => fake()->paragraph(),
                'status' => "P"
            ]);
            app()->setLocale('ru');
            $title = '// RU //'.fake()->sentence();
            $article->update([
                'title' => $title,
                'slug' => Str::slug($title),
                'lead' => fake()->paragraph(),
                'body' => fake()->paragraph(),
                'status' => "P"
            ]);

        }
    }
}
