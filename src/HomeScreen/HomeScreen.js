import * as React from "react";
import { Component, useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Categories from "./Categories";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { home } from "../constant";
import { search } from "../constant";

//const home = require("./menu1.png");
//const search = require("./search.png");

function HomeScreen(props) {
  const [query, setQuery] = useState("");

  const navigation = useNavigation();

  const [isDatePickerVisibleF, setDatePickerVisibilityF] = useState(false);
  const [isDatePickerVisibleT, setDatePickerVisibilityT] = useState(false);

  const [fromDate, setFromdate] = useState("");
  const [toDate, setTodate] = useState("");

  const [dispFdate, setDispfdate] = useState("");
  const [dispTdate, setDisptdate] = useState("");

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setDispfdate("");
      setDisptdate("");
    });
  }, [dispFdate, dispTdate]);

  const handleConfirm1 = (date) => {
    let fDate =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    setDatePickerVisibilityF(false);
    setFromdate(date.toISOString());
    setDispfdate(fDate);
  };

  const handleConfirm2 = (date) => {
    let tDate =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    setDatePickerVisibilityT(false);
    setTodate(date.toISOString());
    setDisptdate(tDate);
  };

  return (
    <View style={styles.body}>
      <ScrollView>
        <View style={styles.row}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Image source={home} style={styles.home} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.txt}>NewsApp</Text>
            {/* <Text style={styles.txt1}>One stop for world-wide news</Text> */}
          </View>
        </View>

        <View style={styles.search}>
          <TextInput
            style={styles.input}
            placeholder="Search about anything"
            onChangeText={(query) => setQuery({ query })}
            value={query}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("FindNews", {
                screen: "FindNews",
                searchItem: query,
                item: "",
                from: fromDate,
                to: toDate,
              })
            }
          >
            <Image source={search} style={styles.lg1} />
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 40,
              marginRight: 40,
            }}
          >
            <View>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => {
                  setDatePickerVisibilityF(true);
                }}
              >
                {dispFdate == "" ? (
                  <Text style={styles.text}>From Date</Text>
                ) : (
                  <Text style={styles.text}>{dispFdate}</Text>
                )}
                {/* <Text style={styles.text}>{dispFdate}</Text> */}
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisibleF}
                mode="date"
                onConfirm={handleConfirm1}
                onCancel={() => {
                  setDatePickerVisibilityF(false);
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => {
                  setDatePickerVisibilityT(true);
                }}
              >
                {dispTdate == "" ? (
                  <Text style={styles.text}>To Date</Text>
                ) : (
                  <Text style={styles.text}>{dispTdate}</Text>
                )}
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisibleT}
                mode="date"
                onConfirm={handleConfirm2}
                onCancel={() => {
                  setDatePickerVisibilityT(false);
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <View
            style={{
              borderBottomColor: "#ffffff",
              borderBottomWidth: 2,
              width: 300,
            }}
          ></View>
        </View>

        <Categories navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#00000000",
  },

  row: {
    flex: 1,
    height: 90,
    backgroundColor: "#05445E",
    //backgroundColor: "#ffff",
    flexDirection: "row",
    marginBottom: 10,
  },

  txt: {
    color: "#ffff",
    fontSize: 25,
    marginLeft: 15,
    marginTop: 30,
    fontFamily: "sans-serif-middle",
  },
  txt1: {
    color: "#CCD1E4",
    fontSize: 15,
    marginLeft: 15,
    fontStyle: "italic",
    fontFamily: "Roboto",
  },

  input: {
    flex: 1,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 40,
    textAlign: "center",
    justifyContent: "flex-start",
    fontSize: 18,
    marginBottom: 10,
    height: 40,
  },

  lg1: {
    height: 40,
    width: 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  lg2: {
    fontSize: 15,
    color: "#000000",
  },

  button: {
    height: 40,
    width: 40,
    marginRight: 40,
    backgroundColor: "#89A1B4",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 17,
    borderRadius: 10,
  },

  search: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  button2: {
    marginTop: 20,
    marginBottom: 20,
    width: 100,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    borderRadius: 20,
  },
  home: {
    height: 40,
    width: 40,
    marginTop: 28,
    marginLeft: 15,
    borderRadius: 10,
  },
  dateButton: {
    height: 30,
    width: 145,
    backgroundColor: "#ffff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  clear: {
    height: 18,
    width: 18,
    borderRadius: 50,
    // borderTopRightRadius: 20,
    // borderBottomRightRadius: 20,
    marginTop: 10,
  },
  date: {
    alignItems: "stretch",
    justifyContent: "space-around",
    marginTop: 10,
    height: 30,
    //backgroundColor: "#ffff",
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20,
  },
  text: {},
});

export default HomeScreen;
