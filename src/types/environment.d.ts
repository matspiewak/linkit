declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
			NEXTAUTH_SECRET: string;
			MY_SECRET_TOKEN: string;
			AWS_CLOUDFRONT: string;
			AWS_ACCESS_KEY_ID: string;
			AWS_SECRET_ACCESS_KEY: string;
			AWS_BUCKET_NAME: string;
			NODE_ENV: 'development' | 'production';
		}
	}
}

export {};
