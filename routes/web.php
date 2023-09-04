<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Route::any('/firewall/panel/{path?}', function() {
//
//    $panel = new \Shieldon\Firewall\Panel();
//    $panel->csrf(['_token' => csrf_token()]);
//    $panel->entry();
//
//})->where('path', '(.*)');

Route::view('/{path?}','welcome')->where('path','.*');
