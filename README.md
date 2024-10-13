# Akiya Map App
 
 This project is a web application that displays available vacant houses (空き家) on a map using Leaflet.js and Supabase. The addresses of vacant houses are retrieved from a Supabase database, and markers are dynamically added to the map by converting the addresses to latitude and longitude using the Geospatial Information Authority of Japan (GSI) API.
 
 ## Features
 - Fetches addresses from a Supabase table (`akiya` table).
 - Converts addresses to latitude and longitude using GSI API.
 - Displays markers on a Leaflet map for each address.
 - Automatically adjusts the map view to fit all markers.
 - Custom error handling and logging for data fetching.
 
 ## Technologies Used
 - **React**: A JavaScript library for building user interfaces.
 - **Leaflet.js**: An open-source JavaScript library for interactive maps.
 - **Supabase**: An open-source Firebase alternative, used for managing the database of addresses.
 - **Geospatial Information Authority of Japan (GSI) API**: Used to convert addresses into geographical coordinates.
 
 ## Installation
 
 ### Prerequisites
 Ensure that you have the following installed on your machine:
 - Node.js
 - NPM (or Yarn)
 
 ### Setup
 
 1. Clone the repository:
    ```bash
    git clone https://github.com/takeruhukushima/Akiyack.git
    cd Akiyack
    ```
 
 2. Install dependencies:
    ```bash
    npm install
    ```
 
 3. Set up your Supabase credentials:
    - Add your Supabase project URL and API key in a `.env` file at the root of the project:
      ```env
      REACT_APP_SUPABASE_URL=your-supabase-url
      REACT_APP_SUPABASE_ANON_KEY=your-anon-key
      ```
 
 4. Start the development server:
    ```bash
    npm start
    ```
 
    This will launch the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
 
 ## Usage
 
 - The map will display markers for each vacant house fetched from the `akiya` table in the Supabase database.
 - Each marker represents the location of a vacant house, and clicking on a marker shows the address.
 - If an error occurs during data fetching or geocoding, an error message will be displayed at the top of the screen.
 
 ## Supabase Table Structure
 
 The `akiya` table in Supabase should have at least one column:
 - `location` (string): The address of the vacant house.
 
 ## License
 
 This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
 
 ## Future Improvements
 - Add more detailed house information (e.g., number of rooms, condition, price, etc.).
 - Implement authentication and user roles for different access levels (e.g., admins, house owners).
 - Improve geocoding accuracy by considering multiple results from the GSI API.
 - Add support for user-submitted vacant house entries directly from the app.
 
 ## Contributions
 
 Contributions are welcome! Please open an issue or submit a pull request if you'd like to help improve the app.