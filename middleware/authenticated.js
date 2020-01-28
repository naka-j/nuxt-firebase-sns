export default function({store, redirect}) {  
  if (store.getters.getCurrentUser === null) {
    redirect('/signin')
  }
}