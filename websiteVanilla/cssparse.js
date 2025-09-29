
  async function login() {
      const user = document.getElementById("username").value.trim();
      const pass = document.getElementById("password").value.trim();
      const message = document.getElementById("message");

      let csvText;
      try {
        const res = await fetch("database.csv");
        csvText = await res.text();
      } catch (err) {
        message.textContent = "Error loading database.csv";
        return;
      }

      //check data
      const rows = csvText.split("\n").map(r => r.trim()).filter(r => r.length > 0);
      let found = false;
      let allowed = false;

      for (const row of rows) {
        const [csvUser, csvPass, csvAllowed] = row.split(";").map(s => s.trim());
        if (csvUser === user) {
          found = true;
          if (csvPass === pass) {
            allowed = (csvAllowed.toLowerCase() === "true");
            break;
          } else {
            message.textContent = "Incorrect password";
            return;
          }
        }
      }

      if (!found || !allowed) {
        //third party doesnt have access to this NFT URI data
        document.body.innerHTML = "<h1 style='text-align:center;'>USER NOT ALLOWED TO FETCH DATA!!</h1>";
      } else {
        //third party has access to the NFT URI data
        document.body.innerHTML = "<h1 style='text-align:center;'>GAVIN-TULACIONES!! YOU CAN ACCESS THE DATA YOU WERE GIVEN ACCESS TO!!</h1>";
      }
    }