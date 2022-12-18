export type PostObject = {
	"_version": number,
	"locale": string,
	"uid": string,
	"ACL": object,
	"_in_progress": false,
	"author": string,
	"category": string,
	"created_at": string,
	"created_by": string,
	"date": string,
	"html_content": string,
	"image": {
		"parent_uid": string,
		"uid": string,
		"created_by": string,
		"updated_by": string,
		"created_at": string,
		"updated_at": string,
		"content_type": string,
		"file_size": string,
		"filename": string,
		"title": string,
		"ACL": object,
		"_version": number,
		"is_dir": false,
		"tags": string[],
		"publish_details": {
			"environment": string,
			"locale": string,
			"time": string,
			"user": string
		},
		"url": string
	},
	"mobile_image": null,
	"subtitle": string,
	"tags": string[],
	"title": string,
	"updated_at": string,
	"updated_by": string,
	"url": {
		"hosted_url": string
	},
	"publish_details": {
		"environment": string,
		"locale": string,
		"time": string,
		"user": string
	}
}

export type ContentStackTokens = {
	ApiKey: string,
	EnvPlusDeliveryToken: string,
	Environment: string,
} | undefined;


export type ContentStackTokenReply = {
	ApiKey: string,
	EnvPlusDeliveryToken: string,
}
