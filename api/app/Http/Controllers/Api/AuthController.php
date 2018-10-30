<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\JWTAuth;
use App\User;
use App\Http\Resources\User as UserResource;
use App\Http\Controllers\FamilyController;
use DB;

class AuthController extends Controller {

    /**
     * @var JWTAuth
     */
    private $jwtAuth;

    /**
     * @var FamilyController
     */
    private $familia;

    public function __construct(JWTAuth $jwtAuth, FamilyController $family) {
        $this->jwtAuth = $jwtAuth;
        $this->familia = $family;
    }

    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        if (! $token = $this->jwtAuth->attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        $user = $this->jwtAuth->authenticate($token);

        $family = serialize($user);


        $family = explode("attributes\"", $family)[1];
        $family = explode("s:6:\"family\";i:", $family)[1];
        $family = explode(";", $family)[0];
        $family = $this->familia->show($family);

        return response()->json(compact('token', 'user', 'family'));
    }

    public function refresh() {
        $token = $this->jwtAuth->getToken();
        $token = $this->jwtAuth->refresh($token);

        return response()->json(compact('token'));
    }

    public function logout() {
        $token = $this->jwtAuth->getToken();
        $this->jwtAuth->invalidate($token);

        return response()->json(['logout']);
    }

    public function me() {

	    if (! $user = $this->jwtAuth->parseToken()->authenticate()) {
		    return response()->json(['error' => 'user_not_found'], 404);
	    }

        return response()->json(compact('user'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $user = new User;

        $user->name = $request->input('name');
        $user->password = bcrypt($request->input('password'));
        $user->email = $request->input('email');
        $user->family = 1;
        $user->score = 0.00;
        $user->icon = 'far fa-id-badge';
        $user->remember_token = str_random(10);

        // unset

        if ($user->save()) {
            return new UserResource($user);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $userWToken = $this->me();
        $userW = serialize($userWToken);
        $userW = explode("user\":{\"id\":", $userW)[1];
        $userW = explode(",", $userW)[0];
        if ( $userW === $id ) {
            $userget = User::findOrFail($id);
            $usertocast = new \stdClass();
            $usertocast->name = is_null($request->input('name')) ? null : $request->input('name');
            $usertocast->password = is_null($request->input('password')) ? null : bcrypt($request->input('password'));
            $usertocast->email = is_null($request->input('email')) ? null : $request->input('email');
            $usertocast->family = is_null($request->input('family')) ? null : $request->input('family');
            $usertocast->score = $userget->score + $request->input('score');
            $usertocast->icon = is_null($request->input('icon')) ? null : $request->input('icon');

            foreach ($usertocast as $key => $value) {
                if($value === null) {
                    unset($usertocast->$key);
                }
            }

            $data = get_object_vars($usertocast);
            $data = DB::table('users')->where('id', $id)->update($data);
            if ($data) {
                return $this->show($id);
            } else {
                $user = $this->show($id);
                return response()->json(compact('user'));
            }
        } else {
            return "Hacking it isn't allowed!";
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $users = DB::table('users')->where('family', $id)->get();
        return response()->json(compact('users'));
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $userWToken = $this->me();
        $user = serialize($userWToken);
        $user = explode("user\":{\"id\":", $user)[1];
        $user = explode(",", $user)[0];
        if ( $user === $id ) {
            $userCalled = User::findOrFail($id);
            if ($userCalled->delete()) {
                return new UserResource($userCalled);
            }
        } else {
                return "Hacking it isn't allowed!";
        }
    }
}
