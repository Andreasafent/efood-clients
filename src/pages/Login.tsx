function Login(){
    return (
        <div className="flex justify-center h-[200px] items-center">
            <div className="flex flex-col gap-3">
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="password" className="grow" value="password" />
                </label>
            </div>
        </div>
    );
}

export default Login;