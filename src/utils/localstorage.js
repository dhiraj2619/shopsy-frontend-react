export const loadState =()=>{
    try {
        const serializedState = localStorage.getItem('cartState');
        
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Could not load state', error);
        return undefined;
    }
}

export const saveState =(state)=>{
  try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('cartState',serializedState)
  } catch (error) {
    console.error('Could not save state', error);
  }
}

