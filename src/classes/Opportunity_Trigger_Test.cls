/*
 * @Name: Opportunity_tgr
 * @Description: Trigger de Ejecucion Opportunity
 * @Create by: 
 * 
 * V0-Creacion
*/
@isTest
private class Opportunity_Trigger_Test {
	private static final String TRIGGER_CONTEXT_ERROR = 'Trigger Error';
	static Opportunity Opp = new Opportunity();
    static Map<String, Profile> perfilMapa = new Map<String, Profile>();    
    static Map<String, UserRole> RolMapa = new Map<String, UserRole>();
    static List<Profile> p; 
    static List<RecordType> rTypesClientes;
    static List<UserRole> userRole;

	static{
        p = new List<Profile>([SELECT Id, Name FROM Profile]);
        userRole = new List<UserRole>([SELECT Id, Name FROM UserRole]);
        
        for(Profile perfil:p){ perfilMapa.put(perfil.Name, perfil); }
 
    }    

  @isTest
  static void testEjecutivo() {
      
        CreatOpp();
		User u=CreaUsuario('Ejecutivo');	
		User g=CreaUsuario('Gerente');
		test.startTest();
      	try{    
		Opp.ownerId=u.Id;
			Update Opp;
		Opp.ownerId=g.Id;
			Update Opp;
        }catch(Exception ex){
          }    
        test.stopTest();
        
      
  }
      @isTest
  static void testGerente() {
      
        CreatOpp();
		User u=CreaUsuario('Gerente');	
		User a=CreaUsuario('Asistente');          
		test.startTest();
      	try{
		Opp.ownerId=u.Id;
			Update Opp;          
		Opp.ownerId=a.Id;
			Update Opp;
        } catch(Exception ex){
          }
      	test.stopTest();
  }
    @isTest
static void testEspecialista() {
      
        CreatOpp();
		User u=CreaUsuario('Ejecutivo');	
		User e=CreaUsuario('Especialista');         
		test.startTest();
      	try{
		Opp.ownerId=u.Id;
			Update Opp;          
		Opp.ownerId=e.Id;
			Update Opp;
        } catch(Exception ex){
          }
      	test.stopTest();
  }
    @isTest
static void testAsistente() {
      
        CreatOpp();
		User u=CreaUsuario('Ejecutivo');	
		User a=CreaUsuario('Asistente');          
		test.startTest();
      	try{
		Opp.ownerId=u.Id;
			Update Opp;          
		Opp.ownerId=a.Id;
			Update Opp;
        } catch(Exception ex){
          }
      	test.stopTest();
  }
    @isTest
static void testAsistente2() {
      
        CreatOpp();
		User u=CreaUsuario('Especialista');	
		User a=CreaUsuario('Asistente');          
		test.startTest();
      	try{
		Opp.ownerId=a.Id;
			Update Opp;          
		Opp.ownerId=u.Id;
			Update Opp;
        } catch(Exception ex){
          }
      	test.stopTest();
  } 
    @isTest
static void testAsistente3() {
      
        CreatOpp();
		User u=CreaUsuario('Especialista');	
		User a=CreaUsuario('Asistente');          
		test.startTest();
      	try{
		Opp.ownerId=u.Id;
			Update Opp;          
		Opp.ownerId=a.Id;
			Update Opp;
        } catch(Exception ex){
          }
      	test.stopTest();
  }     
    static void CreatOpp(){
       Opp = new Opportunity(
			Name='Test',
			CloseDate=system.today(),
			Stagename='01'
       ); 
        insert Opp;
    }
    static User CreaUsuario(String Perfil){
		User u = new User();
	    u.Username=Perfil+'u2@u.com.u';
	    u.LastName=Perfil+'uLast2';
	    u.Email=Perfil+'u2@u.com';
	    u.Alias= Perfil.substring(0, 2)+'uAas2';
	    u.CommunityNickname=Perfil+'2uComm';
	    u.TimeZoneSidKey='America/Mexico_City';
	    u.LocaleSidKey='en_US';
	    u.EmailEncodingKey='ISO-8859-1';
	    u.ProfileId=  perfilMapa.get(Perfil).Id;
	    u.LanguageLocaleKey='en_US';
	    insert u;
        return u;
    }
	}