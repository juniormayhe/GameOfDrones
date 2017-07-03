export class GameSaveService {
    
    save(key: string, value: any) {
        
        if (value) {
            value = JSON.stringify(value);
            
            localStorage.setItem(key, value);
            
        }
        this.checkLocalStorage();
        
    }

    read<T>(key: string): T {

        
        try {
            
            if (!this.checkLocalStorage()) {
                
                return undefined;
            }
            
            let value: string = localStorage.getItem(key);
            
            if (value && value != "undefined" && value != "null") {
                //returns a poco with same attributes but not with T type name
                return <T>JSON.parse(value);
            }
        }
        catch (Exception) { }

        return undefined;
    }

    checkLocalStorage(): boolean {
        let result: boolean =true;
        if (!localStorage) {
            alert("get a newer browser!");
            console.log("Cannot use local storage in this browser");
            result = false;
        }
        return result;
    }
}