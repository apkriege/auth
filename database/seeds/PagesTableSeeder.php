<?php

use Illuminate\Database\Seeder;

class PagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $pages = array(
            ['title' => 'Home', 'url' => 'home', 'content' => 'home shit'],
            ['title' => 'Second Page', 'url' => 'second', 'content' => 'second page shit'],
            ['title' => 'Third Page', 'url' => 'third', 'content' => 'third page shit'],
            ['title' => 'Fourth Page', 'url' => 'fourth', 'content' => 'fourth page shit'],
        );

        foreach($pages as $page){
            DB::table('pages')->insert([
                'title' => $page['title'],
                'url' => $page['url'],
                'content' => $page['content']
            ]);
        }

    }
}
