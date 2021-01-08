import java.io.*;

class ticketing_sym
{
DataInputStream in=new DataInputStream(System.in);
int choice;
int ticket=0;
String vehicle_number []=new String [100];
String name []=new String [100];
String offense []=new String [100];
int fine []=new int [100];
int date[]=new int [100];
int fine_sorted_index[] = new int [100];

/*
  void filewrite()
   {
   try{
   // Create file 
   FileWriter fstream = new FileWriter("out.txt");
   BufferedWriter out = new BufferedWriter(fstream);
   out.write("Hello Java");
   //Close the output stream
   out.close();
   }catch (Exception e){//Catch exception if any
   System.err.println("Error: " + e.getMessage());
   }
   }
 */

   
   void store_filewrite()
   {
       int i;
   try{
   // Create file 
   FileWriter fstream = new FileWriter("traffic.txt");
   BufferedWriter out = new BufferedWriter(fstream);
   
   out.write("Number of tickets stored currently= "+ticket);
   out.write("\r\n");
   
   
   for(i=0;i<ticket;i++)
   {
       out.write(i+1+".\r\n");
       out.write("Vehicle number= "+vehicle_number[i]+"\r\n");      
       out.write("Name= "+name[i]+"\r\n");
       out.write("Offense=  "+offense[i]+"\r\n");
       out.write("Fine imposed=  "+fine[i]+"\r\n");
       out.write("Date=  "+date[i]+"\r\n");
       
 
    }
   
    
  
   //Close the output stream
   out.close();
   }catch (Exception e){//Catch exception if any
   System.err.println("Error: " + e.getMessage());
   }
   }
   
   void  retrieve_fileread()
   {
       System.out.println ("\nReading from File\n");
   try{
   // Open the file that is the first 
   // command line parameter
   FileInputStream fstream = new FileInputStream("out.txt");
   // Get the object of DataInputStream
   DataInputStream in = new DataInputStream(fstream);
   BufferedReader br = new BufferedReader(new InputStreamReader(in));
   String strLine;
   //Read File Line By Line
   while ((strLine = br.readLine()) != null)   {
   // Print the content on the console
   System.out.println (strLine);
   }
   //Close the input stream
   in.close();
     }catch (Exception e){//Catch exception if any
   System.err.println("Error: " + e.getMessage());
   }
   }
   
/*  
   void  fileread()
   {
       System.out.println ("\nReading from File\n");
   try{
   // Open the file that is the first 
   // command line parameter
   FileInputStream fstream = new FileInputStream("out.txt");
   // Get the object of DataInputStream
   DataInputStream in = new DataInputStream(fstream);
   BufferedReader br = new BufferedReader(new InputStreamReader(in));
   String strLine;
   //Read File Line By Line
   while ((strLine = br.readLine()) != null)   {
   // Print the content on the console
   System.out.println (strLine);
   }
   //Close the input stream
   in.close();
     }catch (Exception e){//Catch exception if any
   System.err.println("Error: " + e.getMessage());
   }
   }
*/

    int Display_Menu()throws Exception
    {
        int a;
        
        do {
            System.out.println( "Enter any one of the choices\n\n");
            System.out.println("1.Issue ticket\n");
            System.out.println("2.Display ticket\n");
            System.out.println("3.Store ticket\n");
            System.out.println("4.Retrieve ticket\n");
            System.out.println("5..Help/About\n");
            System.out.println("6.Exit");

            a = Integer.parseInt(in.readLine());
            if ( (a<1) || (a > 6))
            System.out.println("\n\nWrong choice.Enter only between 1 to 6.\n\n");
                
      
        
        } while ( (a < 1) || (a >6) );
        return a;
    
    }
    
    int Display_Menu(int b)throws Exception
    {
        int a;
        do {
            System.out.println("Enter any one of the choices\n\n");
            System.out.println("1.Display tickets of all stored vehicles\n");
            System.out.println("2.Display ticket of particular vehicle\n");
            System.out.println("3.Display tickets as per date\n");
            System.out.println("4.Display tickets as per fine imposed\n");
            System.out.println("5.Return to main menu\n");

            a = Integer.parseInt(in.readLine());
            
            if ( (a<1) || (a > 5))
            System.out.println("\n\nWrong choice.Enter only between 1 to 6.\n\n");
   
        } while ( (a < 1) || (a >5) );
        return a;
    
    }
   
    void Issue_Tickets()throws Exception
    {
     
        System.out.println("\n\n                               ISSUE TICKET MENU\n\n");
        System.out.println("Enter vehicle number\n");
         vehicle_number[ticket] =in.readLine();
        System.out.println("Enter the name\n");
         name[ticket]=in.readLine();
        System.out.println("Enter offense committed\n");
        offense[ticket]=in.readLine();
        System.out.println("Enter fine imposed\n");
        fine[ticket]=Integer.parseInt(in.readLine());
        System.out.println("Enter the date\n");
        date[ticket]=Integer.parseInt(in.readLine());
        ticket++;
         
    }
   
    
    void Display_All_Tickets()
    {
        int i;
        System.out.println("Display All Tickets ");
        for(i=0;i<ticket;i++)
        {
            System.out.println(" ...............................................");
            System.out.println(" Serial  # "+(i+1)+"\r\n");
            System.out.println("Vehicle Number "+vehicle_number[i]);
            System.out.println("Name "+name[i]);
            System.out.println("Offense "+offense[i]);
            System.out.println("Fine imposed "+fine[i]);
            System.out.println("Date of offense committed "+date[i]);
            System.out.println(" ...............................................");
        }
    }
    
    void Display_Single_Ticket()throws Exception
    {
        String v_no;
        int i,j;
        String newString,new1String,new2String;
        int flag=0;
        System.out.println("Display Single Ticket");
         System.out.println("Enter the Vehicle Number");
         v_no =in.readLine();
         newString = v_no.replace(" ","");
         new1String = newString.toUpperCase();
         
         
         for (i=0;i<ticket;i++)//USING LINEAR SEARCH
         {
             newString = vehicle_number[i].replace(" ","");
             new2String = newString.toUpperCase();
             if (new1String.equals(new2String))
             
                {
                    
                    System.out.println(" ...............................................");
                    //System.out.println(" Serial  # "+(i+1)+"\r\n");
                    System.out.println("Vehicle Number "+vehicle_number[i]);
                    System.out.println("Name "+name[i]);
                    System.out.println("Offense "+offense[i]);
                    System.out.println("Fine imposed "+fine[i]);
                    System.out.println("Date of offense committed "+date[i]);
                    System.out.println(" ...............................................");
                    flag=1;
                }
             
             
             
            }
         
         if (flag!=1)
         System.out.println("\r\nNo offense committed by vehicle number "+v_no+"\r\n");
         
        
    }
    
    void Display_Date_Wise()
    {
        System.out.println("Display Date Wise");
    }
    
    void Display_Fine_Wise()
    {
        int i,j;
        int fine_sorted[] =  new int[100];
    
        
        System.out.println("Display Fine Wise");    
             
        for(i=0;i<ticket;i++)
        {
            fine_sorted[i]=fine[i];//copying elements of fine
           
        }
        Selection_Sort(fine_sorted);
        
        Display_Details_Fine();
        
       
    }
    
     void Display_Details_Fine()
    {
        int i,j;
        for (j=0;j<ticket;j++){
            i = fine_sorted_index[j];
        
        System.out.println("Display All Tickets ");
       
            System.out.println(" ...............................................");
            System.out.println(" Serial  # "+(i+1)+"\r\n");
            System.out.println("Vehicle Number "+vehicle_number[i]);
            System.out.println("Name "+name[i]);
            System.out.println("Offense "+offense[i]);
            System.out.println("Fine imposed "+fine[i]);
            System.out.println("Date of offense committed "+date[i]);
            System.out.println(" ...............................................");
        }
    }
    void Selection_Sort(int A[])
    {
        int i,j,temp,n,min;
        n=ticket;
        
        
        for(i=0;i<n;i++)
        {
            min=i;
            for(j=i+1;j<n;j++)
            {if(A[j]<A[min])
                min=j;
                
            }
            temp=A[i];
            A[i]=A[min];
            A[min]=temp;
            
          fine_sorted_index[i] = min;
          
        } 
              
           
    }
    
    
    
    
        
    
    void  Display_Tickets() throws Exception
    {
         int choice;
         int b = 1;
        System.out.println("                                     DISPLAY TICKET MENU");
        
        do {

        choice=Display_Menu(b);

       
        switch (choice)
        {
           case 1:
                        Display_All_Tickets();
                        break;
           case 2:
                        Display_Single_Ticket(); 
                        break;
            case 3:
                        Display_Date_Wise();
                        break;
            case 4:
                        Display_Fine_Wise();
                        break;
           case 5:      main();
                        break;
                        
            case 6:
                         System.out.println("TOTAL NUMBER OF TICKETS = "+ticket);
                         System.out.println("THANKS FOR USING Traffic Ticketing System");
                       return;
                       
            default:
             /*NO CHANCE OF THIS ERROR OCCURRING AS IT IS TAKEN CARE OF IN DISPLAY MAIN MENU   */

        }    // Switch
            
        } while (choice <=5 );
        
        
       
    }
    void  Store_Tickets() 
     {
        System.out.println("store");
        store_filewrite();
       
    }
    void  Retrieve_Tickets()
    
     {
        System.out.println("retrieve");
        retrieve_fileread();
       
    }
    void   Ticket_help()
     {
        System.out.println("help");
       
    }
    
    void main()throws Exception
   
    {
        int choice;
       my_label: 
        System.out.println("                                         Traffic Ticketing System");
        do {

        choice=Display_Menu();

       
        switch (choice)
        {
           case 1:
                        Issue_Tickets();
                        break;
           case 2:
                        Display_Tickets(); 
                        break;
            case 3:
                        Store_Tickets();
                        break;
            case 4:
                        Retrieve_Tickets();
                        break;
           case 5:      Ticket_help();
                        break;
                        
            case 6:
                         System.out.println("TOTAL NUMBER OF TICKETS = "+ticket);
                         System.out.println("THANKS FOR USING Traffic Ticketing System");
                       System.exit(0);
                       
            default:
             /*NO CHANCE OF THIS ERROR OCCURRING AS IT IS TAKEN CARE OF IN DISPLAY MAIN MENU   */

        }    // Switch
            
        } while (choice <=6 );
        
        
        } // end of main
    } // Class

    
    