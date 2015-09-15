<?php


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::any('{path?}', function () {
    return view('index');
});

//Route::get('/', function (){
//    return view('index');
//});

Route::group(['prefix' => 'api'], function (){
//    Route::group(['middleware' => 'jwt.auth'], function() {
        Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
//    });

    Route::post('authenticate', 'AuthenticateController@authenticate');

    Route::resource('signup', 'SignupController');

    Route::get('/testing', [ function () {

        // TODO: this will be it's own class

        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);
        return response()->json($user);
//
//
//        return response()->json([
//            'data' => ['email' => $user->email, 'registered_at' => $user->created_at->toDateTimeString()]
//        ]);

//            return response()->json('asdfasdf');
        }
    ]);
});