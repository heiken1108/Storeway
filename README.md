# Project 1

## Instalation and running the project

1. Clone the repository and navigate to the project directory.

2. Install dependencies with npm: 

```
cd storeway
npm install
```

3. Start development server: 
```
npm run dev
```

4. Open [http://localhost:5173/project1](http://localhost:5173/project1) to view the app


## Decisions made in the project Storeway

Storeway is an app that displays all the stores in Norway, you can easily filter the different stores by type, or city. 
You can add your favourite stores, and display only those. 
If you want to see a more compact version of the app, you can click the button in the top right corner. 
You can also click on the different stores to see more information about them.
Storeway is created so you can easily find you favourite store in your city.

## API
The website is using the api from kassalapp, which is an api for developers who need access to various store data.
To reduce the size of the website, we have chosen to only retrieve stores, and not other api calls that they offer.
We have also chosen to only retrieve the first 100 stores, because of the size of the api call, and we didnt think more was necessary for this project.

## Restrictions

One thing to notice, is that you can maximum make 60 api calls per minute. This is an restriction from the api we are using.
- If you spam the "favoritter" button too much, the app will stop displaying the ones that are not loaded yet, because of the restrictions. 

## What is being tested

Most of the components such as the dropdowns, favorite storecard, Favouritebutton filter, header and Storecard are being tested. 
The storecards are rendered with the mocked json file "APImock.json" which is an apicall stored as a json file. 
We also have a snapshot test of the App render.

We do not have an integration test, which tests the whole app. 


## Components
In Storeway we have implemented a few components in order to create the website. What follows is a brief explanation of each, and what is requiered for each to function

### ```StandardButton Props:(text, state, handleClick)```
This component is a general button with several usecases, absed on the function it gets passed into its handle-click. It swaps between classes and styling to accoring to its state. Examples are as a button to show only favorites in AllStores.tsx, or to route from a single store, to another single store in StorePage.tsx.

### ```Dropdown Props:(stores?, cities?, type, handleStoreChange?, handleCityChange?, label, disable)```
This component is a clickable dropdown button for filtering what is displayed on the main store-page. The Dropdown component allows users to select from a list of either stores or cities. It displays a button with a label, and when clicked, shows a dropdown menu with options based on the provided type prop ("store" or "city"). When an option is selected, it triggers the corresponding callback function (handleStoreChange or handleCityChange) if provided, passing the selected value or coordinates. The disable prop can be used to enable or disable user interaction with the dropdown.

### ```Favorite Props:(handleClick, id)```
This component is a button that is used to add a store to favorites. This button is shaped as a heart icon, and is filled when the store is added to favorites. 
The component takes in a function handleClick which is called when the button is clicked. It also takes in an id, which is the unique id of the store. 

### ```FavoriteContainer Props:(showLogo)```
The FavoriteContainer component displays a list of favorite items retrieved from local storage. It accepts a showLogo prop to toggle the display of logos for each item. It fetches the list of favorite item IDs from local storage and renders individual FavoriteData components for each item, passing the id and showLogo props. If there are no favorites, it shows a message indicating no items have been selected.

### ```FavoriteData Props:(id, showLogo)```
The FavoriteData component is responsible for displaying information about a favorite store, including its name and logo. It fetches store data based on the provided id prop using the useFavoriteStore hook. While the data is loading, it displays a loading animation. If the data is unavailable or there's an error, it shows an "❌" symbol. Otherwise, it renders a StoreCard component with the store's details and an option to show or hide the logo based on the showLogo prop.

### ```Header Props: None```
The header is a component that is used to display the name and icon of the website. The headline is clickable and will bring you to the front page which displays all the stores.

### ```LoadingAnimation Props: None```
This component shows up when the app is processing a call to the API an fetching data to present. It is a simple loading animation, collected from loading.io/css/. It is for the whole page when it is loading all stores by filter in AllStores.tsx or when for a single store in StorePage.tsx. When it is fetching favorites, the API is called for each of the id's that have been stored in the cookies. Here, the loading animation is then instead placed inside each StoreCard when it is fetching the information for the relevant store. 

### ```StoreCard Props:(logoSource, name, id, showLogo)```
This component is used as a clickable component that represents a single store. it shows its name and the relevant logo, as well as a button to add it to favorites. This component bases its information on the API. When you press the StoreCard for a specific card you are routed to the StorePage.tsx-page for that Store. The storecards are placed in the AllStores.tsx-page, and are rendered based on the filter that is applied. Their width is fixed, but how many is shown in each row is based on the width of the screen, meaning that phones will only see 1-2 StoreCards for each row. It is also possible to controll whether you want to see the logo or not. This is decided by the showLogo-prop which in turn is deciced globally by the ToggleSwitch. The logoSource, name and id is fetched from the API.

### ```ToggleSwitch Props:(onChange, defaultChecked?)```
This component is a toggle switch UI element used for enabling or disabling specific features, such as displaying logos on store cards. It accepts an onChange callback to handle state changes and an optional defaultChecked prop for the initial state. When clicked, it toggles between two states visually and invokes the onChange callback to notify parent components of state changes.


# Use of cookies
This project utilizes SessionStorage to save the user's selected filters, ensuring that the same stores are displayed even after refreshing the page.

To keep track of your favorite stores, we employ LocalStorage. The store IDs are stored in LocalStorage, and when the 'Favorites' page is accessed, an API call is made to retrieve your preferred stores 