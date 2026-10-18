/**
 * my.docs - Application JavaScript complète
 * Gestion de la connexion, navigation et affichage des documents Drive
 */
(function() {
    'use strict';

    // ------------------------------------------------------------
    // DONNÉES : Liens Google Drive organisés par matière/sous‑matière
    // ------------------------------------------------------------
    const DONNEES = {
        matieres: {
            maths: {
                nom: 'Mathématiques',
                icone: '📐',
                description: 'Analyse, algèbre et raisonnement mathématique pour le premier semestre.',
                dossier: 'https://drive.google.com/drive/folders/1Gj5YGUp7XDpMa0eMwI213WtjrT0-Hwy2',
                sousMatieres: {
                    analyse: {
                        nom: 'Analyse',
                        icone: '📈',
                        dossier: 'https://drive.google.com/drive/folders/1zT9hfu8bfdt2aobuAHPmXqN4Q1X6fwkQ',
                        cours: [
                            { titre: 'Leçon 1 - Limites et Continuité', url: 'https://drive.google.com/file/d/1tIrNK7idvEqoSxvx7InHjptZ8ixzDkpN/view?usp=drivesdk', difficulte: 'moyen' },
                            { titre: 'Leçon 2 - Dérivation', url: 'https://drive.google.com/file/d/1Xpm_rma5PHXVO7fUma38h-S1a-wHd2sQ/view?usp=drivesdk', difficulte: 'moyen' },
                            { titre: 'Leçon 3 - Théorèmes fondamentaux', url: 'https://drive.google.com/file/d/1nQKxRZq9zECsZthngBChX_iH4SPu_Fq5/view?usp=drivesdk', difficulte: 'difficile' },
                            { titre: 'Leçon 4 - Intégration', url: 'https://drive.google.com/file/d/1aUIjapIiCcgVu5z6rb805tA4tzli1XSL/view?usp=drivesdk', difficulte: 'difficile' },
                            { titre: 'Leçon 5 - Suites numériques', url: 'https://drive.google.com/file/d/1seHBpoaRkGAL4kNwRcIfb6QOgNcGltxZ/view?usp=drivesdk', difficulte: 'moyen' },
                            { titre: 'Leçon 6 - Développements limités', url: 'https://drive.google.com/file/d/1wbxiGWcp-mprWD3CKlHgkD8inHsb-oPH/view?usp=drivesdk', difficulte: 'difficile' },
                            { titre: 'Leçon 7 - Équations différentielles', url: 'https://drive.google.com/file/d/1dFz5K70WL1ATjZemt3v109PVRcdLAf_K/view?usp=drivesdk', difficulte: 'difficile' },
                            { titre: 'Leçon 8 - Séries numériques', url: 'https://drive.google.com/file/d/1HUVAXZqpnXjcGMNdbzH8Sa42iBHbAn1e/view?usp=drivesdk', difficulte: 'moyen' }
                        ],
                        exercices: []
                    },
                    algebre: {
                        nom: 'Algèbre',
                        icone: '🔢',
                        dossier: 'https://drive.google.com/drive/folders/1Ia4wtD8MiLltaQXzlNNULxDQNvQlBqol',
                        cours: [
                            { titre: 'Leçon 1 - Espaces vectoriels', url: 'https://drive.google.com/file/d/1onJ30pgj8AtKvrq7c8q7XfS9mZYnpHPs/view?usp=drivesdk', difficulte: 'moyen' },
                            { titre: 'Leçon 2 - Applications linéaires', url: 'https://drive.google.com/file/d/1ntFuuBScGqP0jifWBvcgSkYs-8MWeexy/view?usp=drivesdk', difficulte: 'moyen' },
                            { titre: 'Leçon 3 - Matrices et déterminants', url: 'https://drive.google.com/file/d/1ftqlTllLhTA5kF3nCUsd6UGQwAx15SKp/view?usp=drivesdk', difficulte: 'difficile' },
                            { titre: 'Leçon 4 - Systèmes linéaires', url: 'https://drive.google.com/file/d/1ZcythkWtRlcpzO4Cb1sEbMm_UgadTo0p/view?usp=drivesdk', difficulte: 'moyen' }
                        ],
                        exercices: []
                    }
                }
            },
            physique: {
                nom: 'Physique',
                icone: '⚡',
                description: 'Mécanique classique et électrostatique pour les sciences fondamentales.',
                dossier: 'https://drive.google.com/drive/folders/1eBsSBTaoVpTksk9aY5z_DDkdou1VcYZ9',
                sousMatieres: {
                    mecanique: {
                        nom: 'Mécanique',
                        icone: '🔧',
                        dossier: 'https://drive.google.com/drive/folders/185YlXS5s_6ToVSR-Rvn4QCD-5Vx3Bo8Y',
                        cours: [
                            { titre: 'Leçon 1 - Cinématique du point', url: 'https://drive.google.com/file/d/16SApVLs0VahOLElNlw9wrJpLbON7UxOh/view?usp=drivesdk', difficulte: 'facile' },
                            { titre: 'Leçon 2 - Dynamique et lois de Newton', url: 'https://drive.google.com/file/d/1kxE5Z83tUseRgjHbKgMfcaKSKhTDsTfd/view?usp=drivesdk', difficulte: 'moyen' }
                        ],
                        exercices: []
                    },
                    electrostatique: {
                        nom: 'Électrostatique',
                        icone: '🧲',
                        dossier: 'https://drive.google.com/drive/folders/1BongPBIE_1wCQg9sSyMBKtTcIjvvxAI4',
                        cours: [
                            { titre: 'Leçon 1 - Charges et loi de Coulomb', url: 'https://drive.google.com/file/d/1f6ksa3DHxaAX6AQcNMDBhbN-J4p2v9lu/view?usp=drivesdk', difficulte: 'facile' },
                            { titre: 'Leçon 2 - Champ électrostatique', url: 'https://drive.google.com/file/d/1EJZBEkUFOo5y4AqQFp3dIJ07xMrAD1FZ/view?usp=drivesdk', difficulte: 'moyen' },
                            { titre: 'Leçon 3 - Potentiel électrique (présentation)', url: 'https://docs.google.com/presentation/d/1nfi8curm-5r5PlZJFXENB4EvPM0kdLkI/edit?usp=drivesdk&ouid=109915811638516060098&rtpof=true&sd=true', difficulte: 'moyen' },
                            { titre: 'Leçon 4 - Théorème de Gauss', url: 'https://drive.google.com/file/d/10BjuOp9Y_LLYopEnXg7uGPAIUxznYEvz/view?usp=drivesdk', difficulte: 'difficile' },
                            { titre: 'Leçon 5 - Condensateurs et énergie', url: 'https://drive.google.com/file/d/1EJZTtBuPnEWhvdB2ikODdhzCcoApqN71/view?usp=drivesdk', difficulte: 'difficile' }
                        ],
                        exercices: []
                    }
                }
            },
            info: {
                nom: 'Informatique',
                icone: '💻',
                description: 'Programmation, algorithmique et structures de données fondamentales.',
                dossier: 'https://drive.google.com/drive/folders/1FIwudtUsy_OJVs3AVM41P_rHqSF1lwMs',
                sousMatieres: {
                    programmation: {
                        nom: 'Programmation',
                        icone: '⌨️',
                        dossier: null,
                        cours: [
                            { titre: 'Leçon 1 - Introduction à Python', url: 'https://drive.google.com/file/d/16xBXySQRcmDUEXLis4PdnVwTQ5ERfxhT/view?usp=drivesdk', difficulte: 'facile' },
                            { titre: 'Leçon 2 - Fonctions et modules', url: 'https://drive.google.com/file/d/1PdTU4fiAwThFVTwYJ4ROCWvYxk4adCcV/view?usp=drivesdk', difficulte: 'moyen' },
                            { titre: 'Leçon 3 - Structures de données', url: 'https://drive.google.com/file/d/1tVNstvpQP_pxdu3-xYJsSsDrxi7SBcmU/view?usp=drivesdk', difficulte: 'moyen' },
                            { titre: 'Leçon 4 - Programmation orientée objet', url: 'https://drive.google.com/file/d/1TdtS1cD1sb-Tx5t04--TzIL_CN4CNfZj/view?usp=drivesdk', difficulte: 'difficile' }
                        ],
                        exercices: []
                    },
                    algorithmique: {
                        nom: 'Algorithmique',
                        icone: '🔍',
                        dossier: null,
                        cours: [
                            { titre: 'Leçon 5 - Algorithmes de tri', url: 'https://drive.google.com/file/d/1zJFosUFy-BQVutMf1H_h45bLsIKSX2g3/view?usp=drivesdk', difficulte: 'moyen' },
                            { titre: 'Leçon 6 - Récursivité', url: 'https://drive.google.com/file/d/1SrWYzeKJVYrWK2GtPA3lZwKkM02JcGIQ/view?usp=drivesdk', difficulte: 'difficile' },
                            { titre: 'Leçon 7 - Structures de données avancées', url: 'https://drive.google.com/file/d/1mAwLDwwfL9MF1K9VY8HJH6MpnIwZAYi5/view?usp=drivesdk', difficulte: 'difficile' }
                        ],
                        exercices: []
                    }
                }
            }
        }
    };

    const CLE_SESSION = 'mydocs_session';
    const reduireMouvement = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Change de vue avec un fondu fluide (View Transitions API si disponible)
    function avecTransition(rendu) {
        const executer = () => {
            rendu();
            window.scrollTo({ top: 0, behavior: 'instant' });
        };
        if (!reduireMouvement && typeof document.startViewTransition === 'function') {
            try {
                document.startViewTransition(executer);
                return;
            } catch (e) { /* repli ci-dessous */ }
        }
        executer();
    }

    // ------------------------------------------------------------
    // ÉTAT DE L'APPLICATION
    // ------------------------------------------------------------
    let etat = {
        estConnecte: false,
        utilisateur: null,
        vueCourante: 'accueil',
        matiereCourante: null,
        sousMatiereCourante: null,
        ongletCourant: 'cours'
    };

    // ------------------------------------------------------------
    // RÉFÉRENCES DOM
    // ------------------------------------------------------------
    const pageConnexion = document.getElementById('page-connexion');
    const application = document.getElementById('application');
    const formulaireConnexion = document.getElementById('formulaire-connexion');
    const btnConnexion = document.getElementById('btn-connexion');
    const msgErreur = document.getElementById('msg-erreur');
    const msgSucces = document.getElementById('msg-succes');
    const emailInput = document.getElementById('email');
    const mdpInput = document.getElementById('mot-de-passe');
    const lienOublie = document.getElementById('lien-oublie');
    const btnDeconnexion = document.getElementById('btn-deconnexion');
    const logoApp = document.getElementById('logo-app');
    const navPrincipale = document.getElementById('nav-principale');
    const zoneContenu = document.getElementById('zone-contenu');
    const filAriane = document.getElementById('fil-ariane');
    const nomUtilisateur = document.getElementById('nom-utilisateur');
    const roleUtilisateur = document.getElementById('role-utilisateur');
    const avatarUtilisateur = document.getElementById('avatar-utilisateur');
    const enteteApp = document.getElementById('entete-app');

    // ------------------------------------------------------------
    // FONCTIONS UTILITAIRES
    // ------------------------------------------------------------
    function formatDate() {
        return new Date().toLocaleDateString('fr-FR', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    function getInitiales(nom) {
        return nom.charAt(0).toUpperCase();
    }

    function determinerDifficulte(texte) {
        if (texte === 'facile') return { classe: 'difficulte-facile', label: 'Facile' };
        if (texte === 'moyen') return { classe: 'difficulte-moyen', label: 'Moyen' };
        if (texte === 'difficile') return { classe: 'difficulte-difficile', label: 'Difficile' };
        return { classe: 'difficulte-moyen', label: 'Moyen' };
    }

    function echapperHTML(texte) {
        const div = document.createElement('div');
        div.textContent = texte;
        return div.innerHTML;
    }

    function normaliser(texte) {
        return String(texte)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    function ouvrirLien(url) {
        if (!url) return;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    function lireSession() {
        try { return localStorage.getItem(CLE_SESSION); } catch (e) { return null; }
    }
    function ecrireSession(email) {
        try { localStorage.setItem(CLE_SESSION, email); } catch (e) { /* ignoré */ }
    }
    function effacerSession() {
        try { localStorage.removeItem(CLE_SESSION); } catch (e) { /* ignoré */ }
    }

    // ------------------------------------------------------------
    // GESTION DE LA CONNEXION
    // ------------------------------------------------------------
    let minuteurErreur = null;
    let minuteurSucces = null;

    function afficherMessageErreur(message) {
        msgErreur.textContent = message;
        msgErreur.classList.add('visible');
        msgSucces.classList.remove('visible');
        clearTimeout(minuteurErreur);
        minuteurErreur = setTimeout(() => msgErreur.classList.remove('visible'), 4000);
    }

    function afficherMessageSucces(message) {
        msgSucces.textContent = message;
        msgSucces.classList.add('visible');
        msgErreur.classList.remove('visible');
        clearTimeout(minuteurSucces);
        minuteurSucces = setTimeout(() => msgSucces.classList.remove('visible'), 3000);
    }

    function gererConnexion(email) {
        const partieLocale = email.split('@')[0] || 'Étudiant';
        const nomAffichage = partieLocale
            .split(/[._-]/)
            .filter(Boolean)
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');

        etat.estConnecte = true;
        etat.utilisateur = {
            email: email,
            nom: nomAffichage || 'Étudiant MPI',
            role: 'L1 MPI — Semestre 1',
            initiales: getInitiales(nomAffichage || 'E')
        };

        nomUtilisateur.textContent = etat.utilisateur.nom;
        roleUtilisateur.textContent = etat.utilisateur.role;
        avatarUtilisateur.textContent = etat.utilisateur.initiales;

        pageConnexion.classList.add('masquee');
        application.classList.add('active');
        application.classList.remove('masquer');

        etat.vueCourante = 'accueil';
        etat.matiereCourante = null;
        etat.sousMatiereCourante = null;
        afficherVueAccueil();
        mettreAJourNavigation();
        mettreAJourFilAriane();
    }

    function gererDeconnexion() {
        etat.estConnecte = false;
        etat.utilisateur = null;
        etat.vueCourante = 'accueil';
        etat.matiereCourante = null;
        etat.sousMatiereCourante = null;
        etat.ongletCourant = 'cours';
        effacerSession();

        application.classList.remove('active');
        application.classList.add('masquer');
        pageConnexion.classList.remove('masquee');

        formulaireConnexion.reset();
        emailInput.value = '';
        mdpInput.value = '';
        btnConnexion.classList.remove('chargement');
        btnConnexion.disabled = false;
        zoneContenu.innerHTML = '';
    }

    function soumettreFormulaire(evenement) {
        evenement.preventDefault();

        const email = emailInput.value.trim();
        const mdp = mdpInput.value;
        const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!emailValide) {
            afficherMessageErreur('⚠️ Veuillez saisir une adresse email valide.');
            emailInput.focus();
            return;
        }
        if (mdp.length < 6) {
            afficherMessageErreur('⚠️ Le mot de passe doit contenir au moins 6 caractères.');
            mdpInput.focus();
            return;
        }

        btnConnexion.classList.add('chargement');
        btnConnexion.disabled = true;

        setTimeout(() => {
            btnConnexion.classList.remove('chargement');
            btnConnexion.disabled = false;
            afficherMessageSucces('✅ Connexion réussie ! Bienvenue sur my.docs.');
            ecrireSession(email);
            setTimeout(() => gererConnexion(email), 600);
        }, 900);
    }

    // ------------------------------------------------------------
    // NAVIGATION
    // ------------------------------------------------------------
    function mettreAJourNavigation() {
        const cibleActive = etat.vueCourante === 'sous-matiere' ? etat.matiereCourante : etat.vueCourante;
        navPrincipale.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('actif', item.getAttribute('data-nav') === cibleActive);
        });
    }

    function mettreAJourFilAriane() {
        let html = '<span class="fa-item" data-nav="accueil">🏠 Accueil</span>';
        html += '<span class="fa-separateur">›</span>';

        const nomsMatieres = { maths: '📐 Mathématiques', physique: '⚡ Physique', info: '💻 Informatique' };
        const nomsSousMatieres = {
            analyse: '📈 Analyse',
            algebre: '🔢 Algèbre',
            mecanique: '🔧 Mécanique',
            electrostatique: '🧲 Électrostatique',
            programmation: '⌨️ Programmation',
            algorithmique: '🔍 Algorithmique'
        };

        if (etat.vueCourante === 'accueil') {
            html += '<span class="fa-actuel">Tableau de bord</span>';
        } else if (['maths', 'physique', 'info'].includes(etat.vueCourante)) {
            html += `<span class="fa-actuel">${nomsMatieres[etat.vueCourante] || ''}</span>`;
        } else if (etat.vueCourante === 'sous-matiere') {
            html += `<span class="fa-item" data-nav="${etat.matiereCourante}">${nomsMatieres[etat.matiereCourante] || ''}</span>`;
            html += '<span class="fa-separateur">›</span>';
            html += `<span class="fa-actuel">${nomsSousMatieres[etat.sousMatiereCourante] || ''}</span>`;
        }

        filAriane.innerHTML = html;

        filAriane.querySelectorAll('.fa-item').forEach(item => {
            item.addEventListener('click', () => {
                if (item.hasAttribute('data-nav')) {
                    naviguerVers(item.getAttribute('data-nav'));
                }
            });
        });
    }

    function naviguerVers(destination) {
        if (etat.vueCourante === destination) return;

        let rendu = null;
        if (destination === 'accueil') {
            etat.vueCourante = 'accueil';
            etat.matiereCourante = null;
            etat.sousMatiereCourante = null;
            rendu = afficherVueAccueil;
        } else if (['maths', 'physique', 'info'].includes(destination)) {
            etat.vueCourante = destination;
            etat.matiereCourante = destination;
            etat.sousMatiereCourante = null;
            rendu = () => afficherVueMatiere(destination);
        }
        if (!rendu) return;

        mettreAJourNavigation();
        mettreAJourFilAriane();
        avecTransition(rendu);
    }

    function ouvrirSousMatiere(matiereCle, sousCle) {
        const mat = DONNEES.matieres[matiereCle];
        if (!mat || !mat.sousMatieres[sousCle]) return;

        etat.vueCourante = 'sous-matiere';
        etat.matiereCourante = matiereCle;
        etat.sousMatiereCourante = sousCle;
        etat.ongletCourant = 'cours';

        mettreAJourNavigation();
        mettreAJourFilAriane();
        avecTransition(() => afficherVueSousMatiere(matiereCle, sousCle));
    }

    // ------------------------------------------------------------
    // AFFICHAGE DES VUES
    // ------------------------------------------------------------
    function afficherVueAccueil() {
        const matieres = DONNEES.matieres;
        const dateActuelle = formatDate();

        let html = `
            <div class="banniere-bienvenue">
                <div class="banniere-titre">Bienvenue, ${echapperHTML(etat.utilisateur ? etat.utilisateur.nom : 'Étudiant')} 👋</div>
                <div class="banniere-sous-titre">${dateActuelle} — Retrouvez tous vos cours et exercices en un seul endroit.</div>
                <span class="banniere-badge">🎓 L1 MPI · Semestre 1</span>
            </div>
            <div class="grille-matieres">
        `;

        const infosMatieres = [
            { cle: 'maths', carteClasse: 'carte-maths' },
            { cle: 'physique', carteClasse: 'carte-physique' },
            { cle: 'info', carteClasse: 'carte-info' }
        ];

        infosMatieres.forEach(info => {
            const mat = matieres[info.cle];
            const sousNoms = Object.values(mat.sousMatieres).map(sm => sm.nom);
            const nbCours = Object.values(mat.sousMatieres).reduce((acc, sm) => acc + sm.cours.length, 0);

            html += `
                <div class="carte-matiere ${info.carteClasse}" data-matiere="${info.cle}">
                    <div class="barre-accent"></div>
                    <div class="fleche-entrer">→</div>
                    <div class="icone-matiere">${mat.icone}</div>
                    <div class="titre-matiere">${mat.nom}</div>
                    <div class="description-matiere">${mat.description}</div>
                    <div class="sous-matieres-badges">
                        ${sousNoms.map(nom => `<span class="badge-sous-matiere">${nom}</span>`).join('')}
                        <span class="badge-sous-matiere">📖 ${nbCours} cours</span>
                    </div>
                </div>
            `;
        });

        html += '</div>';

        zoneContenu.innerHTML = html;

        zoneContenu.querySelectorAll('.carte-matiere').forEach(carte => {
            carte.addEventListener('click', () => {
                naviguerVers(carte.getAttribute('data-matiere'));
            });
        });
    }

    function afficherVueMatiere(matiereCle) {
        const mat = DONNEES.matieres[matiereCle];
        if (!mat) return;

        const sousMatieres = mat.sousMatieres;
        const couleurClasse = matiereCle === 'maths' ? 'carte-maths' :
                              matiereCle === 'physique' ? 'carte-physique' : 'carte-info';

        let html = `
            <div class="vue-contenu">
                <div class="entete-vue">
                    <div class="titre-vue">${mat.icone} ${mat.nom}</div>
                    <div class="sous-titre-vue">${mat.description}</div>
                </div>
                <button class="bouton-dossier" id="btn-dossier-matiere" type="button">
                    <span class="icone-dossier">📁</span> Voir le dossier complet
                </button>
                <div class="grille-matieres" style="margin-top: 0;">
        `;

        Object.keys(sousMatieres).forEach(sousCle => {
            const sm = sousMatieres[sousCle];
            const nbCours = sm.cours.length;
            const nbExercices = sm.exercices.length;

            html += `
                <div class="carte-matiere ${couleurClasse}" data-sous-matiere="${sousCle}" data-matiere="${matiereCle}">
                    <div class="barre-accent"></div>
                    <div class="fleche-entrer">→</div>
                    <div class="icone-matiere">${sm.icone}</div>
                    <div class="titre-matiere">${sm.nom}</div>
                    <div class="sous-matieres-badges">
                        <span class="badge-sous-matiere">📖 ${nbCours} cours</span>
                        <span class="badge-sous-matiere">✏️ ${nbExercices} exercice${nbExercices > 1 ? 's' : ''}</span>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        zoneContenu.innerHTML = html;

        const btnDossier = document.getElementById('btn-dossier-matiere');
        if (btnDossier) {
            btnDossier.addEventListener('click', () => ouvrirLien(mat.dossier));
        }

        zoneContenu.querySelectorAll('.carte-matiere[data-sous-matiere]').forEach(carte => {
            carte.addEventListener('click', () => {
                ouvrirSousMatiere(carte.getAttribute('data-matiere'), carte.getAttribute('data-sous-matiere'));
            });
        });
    }

    function genererListeDocuments(sm, onglet, filtre) {
        const documents = sm[onglet] || [];
        const terme = normaliser(filtre || '');
        const resultats = documents.filter(doc => normaliser(doc.titre).includes(terme));

        if (documents.length === 0) {
            const libelle = onglet === 'cours' ? 'cours' : 'exercices';
            return `
                <div class="sm-vide">
                    <div class="sm-vide-icone">${onglet === 'cours' ? '📖' : '✏️'}</div>
                    <div class="sm-vide-titre">Aucun document pour le moment</div>
                    <div class="sm-vide-texte">Les ${libelle} de cette rubrique seront bientôt disponibles.</div>
                </div>
            `;
        }

        if (resultats.length === 0) {
            return `
                <div class="sm-vide">
                    <div class="sm-vide-icone">🔎</div>
                    <div class="sm-vide-titre">Aucun résultat</div>
                    <div class="sm-vide-texte">Aucun document ne correspond à « ${echapperHTML(filtre)} ».</div>
                </div>
            `;
        }

        return resultats.map(doc => {
            const diff = determinerDifficulte(doc.difficulte);
            const estPresentation = doc.url.indexOf('docs.google.com/presentation') !== -1;
            const icone = estPresentation ? '📊' : '📄';
            return `
                <a class="sm-item" href="${doc.url}" target="_blank" rel="noopener noreferrer">
                    <span class="sm-item-icone">${icone}</span>
                    <span class="sm-item-infos">
                        <span class="sm-item-titre">${echapperHTML(doc.titre)}</span>
                        <span class="sm-item-meta">${estPresentation ? 'Présentation' : 'Document PDF'} · Google Drive</span>
                    </span>
                    <span class="sm-badge-diff ${diff.classe}">${diff.label}</span>
                    <span class="sm-item-ouvrir">Ouvrir ↗</span>
                </a>
            `;
        }).join('');
    }

    function afficherVueSousMatiere(matiereCle, sousCle) {
        const mat = DONNEES.matieres[matiereCle];
        const sm = mat.sousMatieres[sousCle];
        const lienDossier = sm.dossier || mat.dossier;

        const html = `
            <div class="vue-contenu">
                <div class="entete-vue">
                    <div class="titre-vue">${sm.icone} ${sm.nom}</div>
                    <div class="sous-titre-vue">${mat.nom} — ${sm.cours.length} cours disponibles</div>
                </div>

                <div class="sm-barre-actions">
                    <div class="sm-onglets" id="sm-onglets">
                        <button type="button" class="sm-onglet actif" data-onglet="cours">📖 Cours (${sm.cours.length})</button>
                        <button type="button" class="sm-onglet" data-onglet="exercices">✏️ Exercices (${sm.exercices.length})</button>
                    </div>
                    <div class="sm-recherche">
                        <span class="sm-recherche-icone">🔎</span>
                        <input type="search" id="sm-recherche" placeholder="Rechercher une leçon…" autocomplete="off">
                    </div>
                </div>

                <div class="sm-liste" id="sm-liste">
                    ${genererListeDocuments(sm, 'cours', '')}
                </div>

                <div class="sm-actions-bas">
                    <button class="bouton-dossier" id="btn-dossier-sm" type="button">
                        <span class="icone-dossier">📁</span> Ouvrir le dossier Drive
                    </button>
                    <button class="sm-retour" id="btn-retour-matiere" type="button">← Retour à ${echapperHTML(mat.nom)}</button>
                </div>
            </div>
        `;

        zoneContenu.innerHTML = html;

        const liste = document.getElementById('sm-liste');
        const champRecherche = document.getElementById('sm-recherche');
        const onglets = document.querySelectorAll('#sm-onglets .sm-onglet');

        let planifie = false;
        function rafraichir() {
            if (planifie) return;
            planifie = true;
            requestAnimationFrame(() => {
                planifie = false;
                liste.innerHTML = genererListeDocuments(sm, etat.ongletCourant, champRecherche.value);
            });
        }

        onglets.forEach(onglet => {
            onglet.addEventListener('click', () => {
                etat.ongletCourant = onglet.getAttribute('data-onglet');
                onglets.forEach(o => o.classList.toggle('actif', o === onglet));
                liste.classList.remove('sans-anim');
                rafraichir();
            });
        });

        champRecherche.addEventListener('input', () => {
            liste.classList.add('sans-anim');
            rafraichir();
        });

        document.getElementById('btn-dossier-sm').addEventListener('click', () => ouvrirLien(lienDossier));
        document.getElementById('btn-retour-matiere').addEventListener('click', () => naviguerVers(matiereCle));
    }

    // ------------------------------------------------------------
    // ÉVÉNEMENTS
    // ------------------------------------------------------------
    function initialiserEvenements() {
        formulaireConnexion.addEventListener('submit', soumettreFormulaire);

        lienOublie.addEventListener('click', (e) => {
            e.preventDefault();
            afficherMessageSucces('ℹ️ Version démo : aucun mot de passe à récupérer, saisissez simplement un email et un mot de passe.');
        });

        btnDeconnexion.addEventListener('click', gererDeconnexion);

        logoApp.addEventListener('click', () => naviguerVers('accueil'));

        avatarUtilisateur.addEventListener('click', () => naviguerVers('accueil'));

        navPrincipale.addEventListener('click', (e) => {
            const bouton = e.target.closest('.nav-item');
            if (bouton) naviguerVers(bouton.getAttribute('data-nav'));
        });

        let scrollPlanifie = false;
        let dernierEtat = false;
        window.addEventListener('scroll', () => {
            if (scrollPlanifie) return;
            scrollPlanifie = true;
            requestAnimationFrame(() => {
                scrollPlanifie = false;
                const scrolle = window.scrollY > 10;
                if (scrolle !== dernierEtat) {
                    dernierEtat = scrolle;
                    enteteApp.classList.toggle('scrolle', scrolle);
                }
            });
        }, { passive: true });
    }

    // ------------------------------------------------------------
    // INITIALISATION
    // ------------------------------------------------------------
    function initialiser() {
        initialiserEvenements();

        const emailSauvegarde = lireSession();
        if (emailSauvegarde) {
            gererConnexion(emailSauvegarde);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialiser);
    } else {
        initialiser();
    }
})();
