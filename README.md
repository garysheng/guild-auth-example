# Guild Auth Example

This is a [Next.js](https://nextjs.org/) project demonstrating authentication and role-based access control using [Guild.xyz](https://guild.xyz/). It serves as a practical example for developers looking to integrate Guild.xyz into their web3 applications.

## Working Example

You can see a live demo of this project at: [https://guild-auth-example.vercel.app/](https://guild-auth-example.vercel.app/)

## Project Overview

This project showcases a simple role-based access control system using Guild.xyz for authentication. Users can access different areas based on their rank within the guild.

Key features:
- Connect your wallet and authenticate with Guild.xyz
- Access different areas based on your Guild rank
- Explore a simple town square with rank-gated buildings
- See Guild's gating features in action

This example serves as a starting point for developers to integrate Guild.xyz into their projects, showcasing the power of Guild's SDK with a practical implementation.

### Home Page (Not Signed In)
![Home Page](/public/readme-images/home.png)

### Home Page (Signed In)
![Home Page Signed In](/public/readme-images/home-signed-in.png)

### Sign In - Connect Wallet
![Sign In - Connect Wallet](/public/readme-images/sign-in-connect-wallet.png)

### Sign In - Verify Guild Membership
![Sign In - Verify Guild Membership](/public/readme-images/sign-in-verify-guild-membership.png)

### Profile Page
![Profile Page](/public/readme-images/profile.png)

### Town Square
![Town Square](/public/readme-images/town-square.png)

### Apprentice Hall (Level 1)
![Apprentice Hall](/public/readme-images/apprentice-hall.png)

### Journeyman Quarter (Level 2)
![Journeyman Quarter](/public/readme-images/journeyman-quarter.png)

### Master's Sanctum (Level 3)
![Master's Sanctum](/public/readme-images/masters-sanctum.png)

## Getting Started

### Prerequisites

- Node.js 14.6.0 or newer
- npm or yarn
- A Firebase project
- A Guild.xyz guild
- A WalletConnect project ID

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/garysheng/guild-auth-example.git
   cd guild-auth-example
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add the following variables:

   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   NEXT_PUBLIC_DEPLOY_SITE_DOMAIN=your_deploy_site_domain

   NEXT_PUBLIC_GUILD_ID=your_guild_id
   NEXT_PUBLIC_GUILD_SLUG=your_guild_slug
   NEXT_PUBLIC_GUILD_ROLE_APPRENTICE_ID=your_apprentice_role_id
   NEXT_PUBLIC_GUILD_ROLE_JOURNEYMAN_ID=your_journeyman_role_id
   NEXT_PUBLIC_GUILD_ROLE_MASTER_ID=your_master_role_id

   NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY_BASE64=your_base64_encoded_service_account_key
   ```

4. To get your Firebase service account key in base64 format:
   - Go to your Firebase project settings
   - Navigate to "Service Accounts"
   - Click "Generate new private key"
   - Save the JSON file
   - Run the following command, replacing `path/to/your/serviceAccountKey.json` with the path to your downloaded JSON file:
     ```bash
     base64 -i path/to/your/serviceAccountKey.json | tr -d '\n'
     ```
   - Copy the output and paste it as the value for `NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY_BASE64` in your `.env.local` file

5. To get your Guild.xyz information:
   - Go to your guild's page on Guild.xyz
   - The GUILD_SLUG is the last part of the URL (e.g., for `https://guild.xyz/example-guild`, the slug is `example-guild`)
   - To find the GUILD_ID and role IDs, you can either:
     - Examine the network tab in your browser's developer tools while on your guild's page
     - Use the Guild SDK to make API calls and retrieve this information

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Guild.xyz and its developer resources, check out the [Guild.xyz Developer Documentation](https://help.guild.xyz/en/collections/3826821-developer-docs).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

If you have any questions or need assistance, feel free to reach out to me on Twitter: [@garysheng](https://x.com/garysheng).
