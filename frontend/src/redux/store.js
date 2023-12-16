import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import userSlice from './slices/userSlice'
import todoSlice from './slices/todoSlice'


const persistConfigUser = {
  key: 'user',
  storage,
};

const persistConfigTodos = {
  key: 'todos',
  storage,
};

const rootReducer = combineReducers({
  userReducer: persistReducer(persistConfigUser, userSlice),
  todosReducer: persistReducer(persistConfigTodos, todoSlice),
});


const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };