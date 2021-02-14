import { Center, Spinner, useToast } from "@chakra-ui/react";
import React from "react";
import { fetchData, saveData } from "../../Utils/pouch.db.functions";
import { Product } from "../FeedProvider";
import { LocaleContext } from "../LocaleProvider";
import { TextContext } from "../TextProvider";

export interface CartItemsModel {
  quantity: number;
  product: Product;
}

interface CartModel {
  items: CartItemsModel[];
  CartQuantity: number;
  CartTotal: string;
  addToCart: (product: Product, quantity: number, index: number) => void;
  removeFromCart: (product: Product, index: number, all?: boolean) => void;
  clearCart: () => void;
}

const initialState: CartModel = {
  items: [],
  CartQuantity: 0,
  CartTotal: "",
  addToCart: (product: Product, quantity: number, index: number) => {},
  removeFromCart: (product: Product, index: number, all?: boolean) => {},
  clearCart: () => {},
};

interface Props {
  children: React.ReactNode;
}

export const CartContext = React.createContext({ ...initialState });

const CartProvider = ({ children }: Props) => {
  const [CartItems, setCartItems] = React.useState<CartItemsModel[]>([]);
  const [CartQuantity, setCartQuantity] = React.useState<number>(0);
  const [CartTotal, setCartTotal] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const { exchangeRate } = React.useContext(LocaleContext);
  const text = React.useContext(TextContext);

  const toast = useToast();

  React.useEffect(() => {
    const { quantity } = CartItems.reduce(
      (total, item) => {
        return {
          product: item.product,
          quantity: total.quantity + item.quantity,
        };
      },
      { product: {}, quantity: 0 }
    );

    const total = CartItems.map((item) => {
      const price = item.product.price * exchangeRate;
      return price * quantity;
    }).reduce((sum, curr) => {
      return sum + curr;
    }, 0);

    setCartTotal(total.toFixed(2));
    setCartQuantity(quantity);
    console.log("called");
    saveData({
      _id: "cart",
      CartItems,
    });
  }, [CartItems]);

  // React.useEffect(() => {

  // }, [CartQuantity]);

  const init = async () => {
    try {
      const data = await fetchData("cart");
      setCartItems((data as any).CartItems as CartItemsModel[]);
    } catch (err) {
      console.error({ err });
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    init();
  }, []);

  const addToCart = (product: Product, quantity: number, index: number) => {
    if (CartQuantity + quantity > 50) {
      toast({
        title: text.CartProvider.toastError2.title,
        description: text.CartProvider.toastError2.description,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      const exists = CartItems.filter((item) => item.product.id === product.id);
      if (exists.length > 0) {
        //Item Exists
        let error = false;
        const newState = CartItems.map((item) => {
          if (product.id === item.product.id) {
            const newItem = { ...item };
            if (newItem.quantity + quantity > 20) {
              const newQ = 20 - newItem.quantity;
              error = true;
              toast({
                title: text.CartProvider.toastError1.title,
                description: text.CartProvider.toastError1.description.replace(
                  "${{}}",
                  newQ.toString()
                ),
                status: "error",
                duration: 2000,
                isClosable: true,
              });
              newItem.quantity = 20;
            } else {
              newItem.quantity = newItem.quantity + quantity;
            }
            return newItem;
          } else {
            return item;
          }
        });

        setCartItems(newState);
        if (!error) {
          toast({
            title: text.CartProvider.toastSuccess.title.replace(
              "${{}}",
              quantity.toString()
            ),
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        }
      } else {
        //Item Doesn't exist in cart
        const newState = [...CartItems, { product, quantity }];
        setCartItems(newState);
        toast({
          title: text.CartProvider.toastSuccess.title.replace(
            "${{}}",
            quantity.toString()
          ),
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      }
    }
  };

  const removeFromCart = (product: Product, index: number, all?: boolean) => {
    const item = CartItems[index];
    const newCart = [...CartItems];
    if (item) {
      if (all) {
        newCart.splice(index, 1);
      } else {
        if (item.quantity - 1 === 0) {
          newCart.splice(index, 1);
          toast({
            title: text.CartProvider.toastRemoveSuccess.title.replace(
              "${{}}",
              ""
            ),
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        } else {
          newCart[index].quantity = item.quantity - 1;
          toast({
            title: text.CartProvider.toastRemoveSuccess.title.replace(
              "${{}}",
              "1"
            ),
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        }
      }

      setCartItems(newCart);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items: CartItems,
        CartQuantity,
        CartTotal,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {loading ? (
        <Center height="100vh">
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.900"
            color="white"
            size="xl"
          />
        </Center>
      ) : (
        children
      )}
    </CartContext.Provider>
  );
};

export default CartProvider;
