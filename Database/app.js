const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Configura il pool di connessioni al database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Imposta l'header Content-Security-Policy per migliorare la sicurezza
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' http://localhost:3000;");
  next();
});

// Definizione delle tabelle nel database se non esistono
const createTables = async () => {
  try {
    const createProdottiTable = `
    CREATE TABLE IF NOT EXISTS Prodotti (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Nome VARCHAR(255) NOT NULL,
        categoria ENUM('tablet', 'monitor', 'smartphone','pc','laptop','tastiera','mouse','componenti_pc') NOT NULL,
        prezzo INT NOT NULL,
        immagine VARCHAR(255) NOT NULL, 
        descrizione VARCHAR(255),
        data_messa_in_vendita DATE NOT NULL
    );`;

    const createUtentiTable = `
    CREATE TABLE IF NOT EXISTS Utenti (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      tipo ENUM('Admin', 'User') NOT NULL,
      nome VARCHAR(255) NOT NULL,
      cognome VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
  );`;
  

    const createAcquistoTable = `
    CREATE TABLE IF NOT EXISTS Acquisto (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_prodotto INT NOT NULL,
        id_utente INT NOT NULL,
        FOREIGN KEY (id_prodotto) REFERENCES Prodotti(id),
        FOREIGN KEY (id_utente) REFERENCES Utenti(id)
    );`;

    await pool.query(createProdottiTable);
    console.log('Tabella Prodotti creata con successo');

    await pool.query(createUtentiTable);
    console.log('Tabella Utenti creata con successo');

    await pool.query(createAcquistoTable);
    console.log('Tabella Acquisto creata con successo');
  } catch (err) {
    console.error('Errore durante la creazione delle tabelle: ' + err.message);
  }
};

// Chiama la funzione per creare le tabelle in modo asincrono
createTables();


// Operazioni CRUD
// Aggiungi prodotto
// Aggiungi prodotto con async/await
app.post('/prodotti', async (req, res) => {
  try {
    const { nome, categoria, prezzo, immagine, descrizione, data_messa_in_vendita } = req.body;
    const query = 'INSERT INTO Prodotti (Nome, categoria, prezzo, immagine, descrizione, data_messa_in_vendita) VALUES (?,?,?,?,?,?)';
  
    const [results] = await pool.query(query, [nome, categoria, prezzo, immagine, descrizione, data_messa_in_vendita]);
    res.status(201).json({ id: results.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Inserisci Utente
app.post('/utenti', async (req, res) => {
  try {
    const { tipo, nome, cognome, username, email, password } = req.body;
    const query = 'INSERT INTO Utenti (tipo, nome, cognome, username, email, password) VALUES (?, ?, ?, ?, ?, ?)';

    const [results] = await pool.query(query, [tipo, nome, cognome, username, email, password]);
    res.status(201).json({ id: results.insertId });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//post Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM Utenti WHERE username = ? AND password = ?';
    const [user] = await pool.query(query, [username, password]);

    if (user.length > 0) {
      // Login riuscito, gestisci come necessario (e.g., generazione di token)
      res.status(200).json({ message: 'Login riuscito' });
    } else {
      // Login fallito
      res.status(401).json({ message: 'Username o password non validi' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Aggiungi Acquisto
app.post('/acquisti', async (req, res) => {
  const { id_prodotto, id_utente } = req.body;
  const query = 'INSERT INTO Acquisto (id_prodotto, id_utente) VALUES (?, ?)';

  try {
    const [results] = await pool.query(query, [id_prodotto, id_utente]);
    res.status(201).json({ id: results.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

;

// Elimina prodotto
app.delete('/prodotti/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Prodotti WHERE id = ?';

  try {
    const [results] = await pool.query(query, [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }
    res.status(200).json({ message: 'Prodotto eliminato con successo' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Elimina utente
app.delete('/utenti/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Utenti WHERE id = ?';

  try {
    const [results] = await pool.query(query, [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    res.status(200).json({ message: 'Utente eliminato con successo' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Prendi prodotti
app.get('/prodotti', async (req, res) => {
  const query = 'SELECT * FROM Prodotti';

  try {
    const [results] = await pool.query(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Prendi singolo prodotto
app.get('/prodotti/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Prodotti WHERE id = ?';

  try {
    const [results] = await pool.query(query, [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }
    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
