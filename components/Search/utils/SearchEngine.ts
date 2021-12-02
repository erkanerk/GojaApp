import axios from "axios"
import { UserFromSearch } from "../data_models/User";
import { APIKit } from "../../../shared/APIkit";

const SearchEngine = async (searchWord: string): Promise<UserFromSearch[]> => {

    const params = {
        search: searchWord
    }
    let searchResult: UserFromSearch[] = []
    if(searchWord.length === 0) {
        return searchResult
    }
    await APIKit.get<UserFromSearch[]>("/users/search", {
       params}).then((response)=>{
           console.log(response.data)
            searchResult = response.data
    }).catch((error)=> {
        console.error(error)
    });
    return searchResult
}
export {SearchEngine}