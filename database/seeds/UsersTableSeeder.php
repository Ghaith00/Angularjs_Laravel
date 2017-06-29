<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $date = new DateTime();
      // Ghaith007 user
      DB::table('users')->insert([
         'name' => 'Tabib',
         'lastname' => 'Ghaith',
         'username' => 'Ghaith007',
         'email' => 'ghaith4816b@gmail.com',
         'password' => bcrypt('00000000'),
         'created_at' => $date,
       ]);
    }
}
