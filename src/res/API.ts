let api_key: string;

let API = {
	make_call: function ( url: string, method: string = "GET", data: any = null ): Promise<any> {
		return new Promise<any>(
			function ( resolve, reject ) {
				const request = new XMLHttpRequest();
				request.onload = function () {
					if ( this.status === 200 ) {
						resolve( this.response );
					} else {
						reject( new Error( this.statusText ) );
					}
				};
				request.onerror = function () {
					reject( new Error( "XMLHttpRequest Error: " + this.statusText ) );
				};
				request.open( method, url );
				request.setRequestHeader( "X-API-Key", api_key );
				if ( data === null ) {
					request.send();
				} else {
					request.send( JSON.stringify( data ) );
				}
			} );
	},

	set_key: function ( key: string ) {
		api_key = key;
	},

	requests: {
		Platform: {
			Content: {
				Search: function ( locale: string, ctype: string, searchtext: string ) {
					let path = `/Platform/Content/Search`;
					let uri = encodeURI(
						`https://www.bungie.net/${path}/${locale}/?ctype=${ctype}&searchtext=${searchtext}`,
					);

					return API.make_call( uri, "GET" );
				},
			},
			Settings: function () {
				let path = `/Platform/Settings`;
				let uri = encodeURI(
					`https://www.bungie.net/${path}/`,
				);

				return API.make_call( uri, "GET" );
			},
		},

		User: {
			SearchByGlobalNamePost: function ( name: string, page: number = 0 ) {
				let data = { displayNamePrefix: name };

				return API.make_call(
					`https://www.bungie.net/platform/User/Search/GlobalName/${page}/`,
					"POST",
					data,
				);
			},
		},
	},
};

export default API;
