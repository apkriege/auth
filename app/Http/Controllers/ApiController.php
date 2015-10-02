<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class ApiController extends controller {

    public function getPages() {
        $data = DB::table('pages')->get();
        return response()->json($data);
    }

    public function editPage(Request $request) {
        $id = $request->input('test');
        $data = DB::table('pages')->where('id', '=', $id)->get();
        return response()->json($data);
    }

    public function updatePage(Request $request) {
        $data = $request->input('test');

        DB::table('pages')->where('id', '=', $data['id'])->update([
            'title' => $data['title'],
            'content' => $data['content']
        ]);

        return response()->json('data');
    }
}