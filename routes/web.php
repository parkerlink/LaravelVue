<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth:sanctum', config('jetstream.auth_session'),'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/products', [ProductController::class, 'index'])
    ->name('products');

    Route::get('/products/create', [ProductController::class, 'create'])
    ->name('products-create');

    Route::post('/products/store', [ProductController::class, 'store'])
    ->name('products-store');

    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])
    ->name('products-edit');

    Route::put('/products/{product}/update', [ProductController::class, 'update'])
    ->name('products-update');

    Route::get('/products/{product}/delete', [ProductController::class, 'delete'])
    ->name('products-delete');
    
    // Route::get('/products', function () {
    //     return Inertia::render('Products/List');
    // })->name('products');
    // Route::get('/products/create', function () {
    //     return Inertia::render('Products/Add');
    // })->name('products-create');
    // Route::get('/products/{product}/edit', function () {
    //     return Inertia::render('Products/Edit');
    // })->name('products-edit');


});
