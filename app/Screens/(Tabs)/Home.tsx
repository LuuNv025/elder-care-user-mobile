import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Header from "../../../components/Header";

const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <Header />

      <ScrollView>
        
        {/* Dịch vụ nổi bật */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dịch vụ nổi bật</Text>
          <View style={styles.serviceContainer}>
            <TouchableOpacity style={styles.serviceCard}>
              <Image
                source={require("../../../assets/images/test1.jpeg")}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceText}>Chăm sóc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceCard}>
              <Image
                source={require("../../../assets/images/test2.jpg")}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceText}>Xét nghiệm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  searchInput: {
    fontSize: 16,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  categoryItem: {
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
  },
  serviceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  serviceCard: {
    backgroundColor: "white",
    padding: 0,
    borderRadius: 10,
    alignItems: "center",
  },
  serviceImage: {
    width: 175,
    height: 150,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
});

export default Home;
