import {
  Button,
    Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { DB } from "../../Utils/firebase";
import { AuthContext } from "../AuthProvider";
import { TextContext } from "../TextProvider";

interface TimeModel {
  hours: number;
  minutes: number;
}

const PeriodicNotification = () => {
  const [Time, setTime] = React.useState<TimeModel>({ hours: 0, minutes: 0 });
  const { register, handleSubmit, errors, setError } = useForm();
  const [Loading, setLoading] = React.useState(true);
  const { user } = React.useContext(AuthContext);
  const text = React.useContext(TextContext);

  const onFormSubmit = (data: any) => {
    console.log({ data });
    const offset = new Date().getTimezoneOffset();

    DB.collection("periodic").doc(user?.uid).set({
      hours: data.hours,
      minutes: data.minutes,
      offset: offset,
    });
  };

  React.useEffect(() => {
    const listener = DB.collection("periodic")
      .doc(user?.uid)
      .onSnapshot((doc) => {
        const data = doc.data();

        if (data) {
          if (data.hours && data.minutes) {
            setTime({
              hours: data.hours,
              minutes: data.minutes,
            });
            // setLoading(false);
          }
        }

        setLoading(false);

        console.log({ fetch: data });
      });
    return () => {
      listener();
    };
  }, []);

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      margin="3em 0em"
    >
      {Loading ? (
        <Center height="300px">
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.900"
            color="white"
            size="xl"
          />
        </Center>
      ) : (
        <>
          <Heading textAlign="center" size="md">
            {text.PeriodicNotification.title}
          </Heading>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <FormControl isRequired>
              <FormLabel htmlFor="hours">
                {text.PeriodicNotification.hours}
              </FormLabel>
              <Select
                width="100%"
                minWidth="20em"
                name="hours"
                defaultValue={Time.hours}
                placeholder={text.PeriodicNotification.hoursPlaceholder}
                ref={register()}
              >
                {new Array(24).fill(0).map((ig, index) => (
                  <option key={`hours_${index}`} value={`${index}`}>
                    {index}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="minutes">
                {text.PeriodicNotification.minutes}
              </FormLabel>
              <Select
                width="100%"
                minWidth="20em"
                name="minutes"
                defaultValue={Time.minutes}
                placeholder={text.PeriodicNotification.minutesPlaceholder}
                ref={register()}
              >
                {new Array(60).fill(0).map((ig, index) => (
                  <option key={`minutes_${index}`} value={`${index}`}>
                    {index}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button m={3} type="submit">
              {text.PeriodicNotification.save}
            </Button>
          </form>
        </>
      )}
    </Flex>
  );
};

export default PeriodicNotification;
