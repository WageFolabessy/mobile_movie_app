import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface TabIconProps {
  focused: boolean;
  icon: any;
  title: string;
}

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
  return focused ? (
    <ImageBackground source={images.highlight} style={styles.activeWrapper}>
      <Image source={icon} style={styles.activeIcon} />
      <Text style={styles.activeText}>{title}</Text>
    </ImageBackground>
  ) : (
    <View style={styles.inactiveWrapper}>
      <Image source={icon} style={styles.inactiveIcon} />
    </View>
  );
};

const _Layout = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarItemStyle: styles.tabItem,
            tabBarStyle: [styles.tabBar, { paddingBottom: insets.bottom + 10 }],
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} icon={icons.home} title="Home" />
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} icon={icons.search} title="Search" />
              ),
            }}
          />
          <Tabs.Screen
            name="saved"
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} icon={icons.save} title="Saved" />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  icon={icons.person}
                  title="Profile"
                />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default _Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0D23",
  },

  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0f0D23",
    borderWidth: 1,
    borderColor: "#0f0D23",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 10,
    elevation: 10,
  },

  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  activeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 112,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
  },

  activeIcon: {
    width: 24,
    height: 24,
    tintColor: "#151312",
    marginRight: 8,
  },

  activeText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },

  inactiveWrapper: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  inactiveIcon: {
    width: 24,
    height: 24,
    tintColor: "#A8B5DB",
  },
});
