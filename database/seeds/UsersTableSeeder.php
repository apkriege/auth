<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
//        DB::table('users')->delete();

        $users = array(
            ['name' => 'a', 'email' => 'a@a.com', 'password' => Hash::make('a')],
            ['name' => 'b', 'email' => 'b@b.com', 'password' => Hash::make('b')],
            ['name' => 'c', 'email' => 'c@c.com', 'password' => Hash::make('c')],
            ['name' => 'd', 'email' => 'd@d.com', 'password' => Hash::make('d')],
        );

        foreach($users as $user){
            User::create($user);
        }
    }
}
