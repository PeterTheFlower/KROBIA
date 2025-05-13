<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Działki na Sprzedaż</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .działka {
            margin-bottom: 30px;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 8px;
            background-color: #f9f9f9;
        }

        .działka h2 {
            color: #007bff;
            margin-top: 0;
        }

        .zdjecia-galeria {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 15px;
        }

        .zdjecie {
            width: calc(50% - 5px); /* Dwa zdjęcia w rzędzie na większych ekranach */
            max-width: 150px;
            height: auto;
            border-radius: 4px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
        }

        .opis {
            margin-bottom: 10px;
            line-height: 1.6;
        }

        .cena {
            font-weight: bold;
            color: #28a745;
            margin-bottom: 15px;
        }

        .kontakt {
            margin-top: 30px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
            text-align: center;
        }

        .kontakt h2 {
            color: #007bff;
            margin-top: 0;
        }

        /* Media Queries dla responsywności */
        @media (max-width: 768px) {
            .zdjecie {
                width: 100%; /* Jedno zdjęcie w rzędzie na mniejszych ekranach */
                max-width: none;
            }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
            .zdjecie {
                width: calc(50% - 5px); /* Dwa zdjęcia w rzędzie na tabletach */
                max-width: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Działki na Sprzedaż</h1>

        <?php
        // Dane pierwszej działki
        $dzialka1 = [
            'nazwa' => 'Działka w malowniczej okolicy',
            'miejsce' => 'Kraków - Zielonki',
            'wielkosc' => '1200 m²',
            'opis_okolicy' => 'Spokojna okolica z dobrym dojazdem do centrum Krakowa. W pobliżu tereny zielone i sklepy.',
            'cena' => '450 000 PLN',
            'zdjecia' => [
                'images/dzialka1_1.jpg',
                'images/dzialka1_2.jpg',
                'images/dzialka1_3.jpg',
                'images/dzialka1_4.jpg',
            ],
        ];

        // Dane drugiej działki
        $dzialka2 = [
            'nazwa' => 'Atrakcyjna działka inwestycyjna',
            'miejsce' => 'Wieliczka - Centrum',
            'wielkosc' => '800 m²',
            'opis_okolicy' => 'Działka położona w centrum Wieliczki, idealna pod inwestycję. Bliskość komunikacji miejskiej i infrastruktury.',
            'cena' => '520 000 PLN',
            'zdjecia' => [
                'images/dzialka2_1.jpg',
                'images/dzialka2_2.jpg',
                'images/dzialka2_3.jpg',
                'images/dzialka2_4.jpg',
            ],
        ];

        // Funkcja do wyświetlania informacji o działce
        function wyswietlDzialke($dzialka) {
            echo '<div class="działka">';
            echo '<h2>' . htmlspecialchars($dzialka['nazwa']) . '</h2>';
            echo '<div class="zdjecia-galeria">';
            foreach ($dzialka['zdjecia'] as $zdjecie) {
                echo '<img src="' . htmlspecialchars($zdjecie) . '" alt="Zdjęcie działki" class="zdjecie">';
            }
            echo '</div>';
            echo '<div class="opis"><strong>Miejsce:</strong> ' . htmlspecialchars($dzialka['miejsce']) . '</div>';
            echo '<div class="opis"><strong>Wielkość:</strong> ' . htmlspecialchars($dzialka['wielkosc']) . '</div>';
            echo '<div class="opis"><strong>Opis okolicy:</strong> ' . htmlspecialchars($dzialka['opis_okolicy']) . '</div>';
            echo '<p class="cena">Cena: ' . htmlspecialchars($dzialka['cena']) . '</p>';
            echo '</div>';
        }

        // Wyświetl obie działki
        wyswietlDzialke($dzialka1);
        wyswietlDzialke($dzialka2);
        ?>

        <div class="kontakt">
            <h2>Dane Kontaktowe</h2>
            <p><strong>Imię i Nazwisko:</strong> Jan Kowalski</p>
            <p><strong>Telefon:</strong> +48 123 456 789</p>
            <p><strong>Email:</strong> jan.kowalski@email.com</p>
        </div>
    </div>
</body>
</html>
