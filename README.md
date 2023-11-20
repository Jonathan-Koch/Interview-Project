## Method 1
    1. Before updating the page state, we’re checking if the data for the new page is already in the cache. If it is, we’re setting data to the cached data. If it’s not, we’re setting data to null to trigger a re-fetch of data. This way, the fetchData function will only be called when the data for the new page is not in the cache.

## Method 2
    2. Should ensure that the fetchData function is called whenever data or page changes, and it should prevent unnecessary API calls.
   
## Method 3
    1. In this updated version of fetchData, before making the API call, it first checks if the data for the current page is already in the cache. If it is, it uses the cached data and skips the API call. If the data is not in the cache, it fetches the data from the API, stores it in the cache, and then updates the component’s state with the new data.

    This way, if you navigate away from a page and then back to it, the component will use the cached data instead of making another API call. However, please note that this cache is only stored in memory, so it will be cleared when the page is refreshed or the JavaScript environment is otherwise reset.

## Method 4
    1. In this modified version of your useEffect hook, it fetches all the data at once when the component mounts and stores each page of data in the cache. Then, when the page changes, it retrieves the data for the new page from the cache instead of making another API call.



# Problems:
    1. When the component mounts: The useEffect hook runs after the first render, so the URL is requested once when the component mounts.
    2. When the page changes: In your handleNext and handlePrev functions, you’re updating the page state, which triggers the useEffect hook and causes the URL to be requested again.
    3. When the data changes: You’re also listing data as a dependency of the useEffect hook, so any change to data will trigger the hook and cause the URL to be requested again. In your handleNext and handlePrev functions, you’re setting data to null before updating the page, which triggers the useEffect hook.

# API CALL WHEN CLICKING NEXT
    1: If (cacheRef.current[nextPage]) {...}: This if statement checks if the data for the next page is already stored in the cache (cacheRef.current). If it is, the cached data is used. If it’s not, setData(null) is called to clear the current data, which could potentially trigger a new fetch for data.