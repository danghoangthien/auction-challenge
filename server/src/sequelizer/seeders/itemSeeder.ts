// Import necessary modules and configure database connection
import sequelize from "./../mySequelize";
import Item from "./../models/Item";

// Define the seed data
const seedData = [
  { title: 'Item 1', description: 'Description 1', initial_price: 100 },
  { title: 'Item 2', description: 'Description 2', initial_price: 200 },
  // Add more seed data as needed
];

async function runSeeder() {
  try {
    // Sync the models with the database
    await sequelize.sync();

    // Insert the seed data into the items table
    await sequelize.models.Item.bulkCreate(seedData);

    console.log('Seeder executed successfully!');
  } catch (error) {
    console.error('Error executing seeder:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

// Run the seeder
runSeeder();